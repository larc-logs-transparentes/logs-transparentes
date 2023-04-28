from controllers.database import db_get_all_global_tree_leaves, db_get_last_consistency_proof, db_insert_global_tree_leaf, db_insert_consistency_proof
from services.trees_states import trees, save_state
from services.objects_models import build_global_tree_root_object, build_local_tree_root_object

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
        return {'status': 'ok', 'value': hash_leaf, 'message': 'Leaves in pending state have been inserted, and tree has been commited'}
    return {'status': 'ok', 'value': hash_leaf, 'message': 'Leaf inserted in pending state'}

def commit_local_tree(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    
    tree = trees[tree_name]
    if len(tree.entries_buffer) == 0:
        return {'status': 'error', 'message': 'Tree does not have entries to commit'}
    
    for entry in tree.entries_buffer:
        tree.append_entry(entry, encoding=False)
    save_state(tree, tree.entries_buffer)
    tree.entries_buffer = []

    tree_root = build_local_tree_root_object(tree)
    save_consistency_proof(tree_name, tree_root)
    append_global_tree(tree_root)

    print(f'Commited tree {tree_name} with root {tree.root}')
    return {'status': 'ok'}

def append_global_tree(entry):    
    global_tree = trees['global_tree']
    hash_entry = global_tree.append_entry(str(entry))
    save_state(global_tree, [hash_entry])
    
    global_root = build_global_tree_root_object(global_tree)
    db_insert_global_tree_leaf(global_tree.length - 1, entry, global_root)

    if global_tree.length % global_tree.commitment_size == 0:
        save_consistency_proof('global_tree', global_root)

    return {'status': 'ok'}

def save_consistency_proof(tree_name, root_object):
    tree = trees[tree_name] 
    last_consistency_proof = db_get_last_consistency_proof(tree_name)

    if last_consistency_proof:
        last_root = last_consistency_proof['root']
        sublength = last_root['tree_size']
        subroot = last_root['value']
        consistency_proof = tree.prove_consistency(sublength, subroot).serialize()
    else:
        consistency_proof = None

    db_insert_consistency_proof(root_object, consistency_proof)
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

    length = tree.length
    buffer_length = len(tree.entries_buffer)
    return {'status': 'ok'} | metadata | {'length': length, 'buffer_length': buffer_length}

def get_tree_root(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]
    return {'status': 'ok', 'value': tree.root}

def get_global_tree_all_leaves():
    return {'status': 'ok'} | db_get_all_global_tree_leaves()

def trees_list():
    return {'status': 'ok', 'trees': list(trees)}