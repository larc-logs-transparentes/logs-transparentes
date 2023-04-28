from config.init_fastapi import database
from services.trees_states import trees, save_state
from services.objects_models import build_global_tree_root_object, build_local_tree_root_object

from datetime import datetime
from transparentlogs_pymerkle import MerkleTree

def create_tree(tree_name, commitment_size):
    if tree_name in trees:
        return {'status': 'error', 'message': 'Tree already exists'}
    tree = MerkleTree()
    tree.tree_name = tree_name
    tree.commitment_size = int(commitment_size)
    tree.entries_buffer = []
    trees[tree_name] = tree
    save_state(tree, None)
    return {'status': 'ok', 'message': 'Tree created'}

def insert_leaf(tree_name, data):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]
    hash_leaf = tree.hash_entry(bytes(data, 'utf-8'))
    tree.entries_buffer.append(hash_leaf)
    if (len(tree.entries_buffer) >= tree.commitment_size):
        commit_local_tree(tree_name)    
        save_state(tree, hash_leaf, is_commited=True)
    else:
        save_state(tree, hash_leaf, is_commited=False)
    return {'status': 'ok', 'value': hash_leaf}

# assinar o root da árvore
def commit_local_tree(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    
    tree = trees[tree_name]
    if len(tree.entries_buffer) == 0:
        return {'status': 'error', 'message': 'Tree does not have entries to commit'}
    
    for entry in tree.entries_buffer:
        tree.append_entry(entry, encoding=False)
    tree.entries_buffer = []

    tree_root = build_local_tree_root_object(tree)

    append_global_tree(tree_root)
    save_state(tree, is_commited=True)

    print(f'Commited tree {tree_name} with root {tree.root}')
    return {'status': 'ok'}

def append_global_tree(entry):    
    global_tree = trees['global_tree']
    hash_entry = global_tree.append_entry(str(entry))
    save_state(global_tree, hash_entry, is_commited=True)
    
    database['global_tree_leaves'].insert_one(
        {
            'index': global_tree.length - 1,
            'value': entry,
        })

    global_root = build_global_tree_root_object(global_tree)
    database['global_tree_roots'].insert_one(global_root)

    if global_tree.length % global_tree.commitment_size == 0:
        save_consistency_proof('global_tree', global_root)

    return {'status': 'ok'}

def save_consistency_proof(tree_name, root_object):
    tree = trees[tree_name]
    last_root = database['consistency_proofs'].find_one({'root.tree_name': tree_name}, sort=[('root.timestamp', -1)])

    if last_root:
        sublength = last_root['root']['tree_size']
        subroot = last_root['root']['value']
        consistency_proof = tree.prove_consistency(sublength, subroot).serialize()
    else:
        consistency_proof = None

    database['consistency_proofs'].insert_one({'root': root_object, 'consistency_proof': consistency_proof})
    print(f'Saved consistency proof for tree {tree_name} with root {root_object["value"]}')

def get_leaf(tree_name, leaf_index):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]
    if int(leaf_index) >= tree.length:
        return {'status': 'error', 'message': 'Leaf index out of range'}
    leaf = tree.leaf(int(leaf_index))
    return {'status': 'ok', 'value': leaf}

def get_tree(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]
    metadata = tree.get_metadata()

    hashes = [tree.leaf(i) for i in range(tree.length)]

    return {'status': 'ok'} | metadata | {'hashes': hashes}

def get_tree_root(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]
    return {'status': 'ok', 'value': tree.root}

def get_global_tree_all_leaves():
    global_tree_leaves = database['global_tree_leaves'].find()
    return {'status': 'ok', 'leaves': [
        {
            'index': leaf['index'],
            'value': leaf['value']
        } for leaf in global_tree_leaves
    ]}

def trees_list():
    return {'status': 'ok', 'trees': list(trees)}