from config.init_fastapi import database
from services.trees_states import trees, save_state
from services.keys import sign_root

from datetime import datetime
from lib.pymerkleLT import MerkleTree

def create_tree(tree_name, commitment_size):
    if tree_name in trees:
        return {'status': 'error', 'message': 'Tree already exists'}
    tree = MerkleTree()
    tree.tree_name = tree_name
    tree.commitment_size = int(commitment_size)
    trees[tree_name] = tree
    save_state(tree, None)
    return {'status': 'ok', 'message': 'Tree created'}

def insert_leaf(tree_name, data):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]
    hash_leaf = tree.append_entry(bytes(data, 'utf-8'))
    if (tree.length % trees[tree_name].commitment_size) == 0:
        publish_tree(tree_name)    
        trees[tree_name].last_published_root = tree.root
        save_state(tree, hash_leaf, published_root=True)
    else:
        save_state(tree, hash_leaf, published_root=False)
    return {'status': 'ok', 'value': hash_leaf}

# assinar o root da árvore
def publish_tree(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]
    global_tree = trees['global_tree']
    global_tree.append_entry(tree.root, encoding=False)
    
    if (global_tree.length % trees['global_tree'].commitment_size) == 0:
        save_global_tree_consistency_proof(global_tree)
        save_state(global_tree, tree.root, published_root=True)
    else:
        save_state(global_tree, tree.root, published_root=False)

    print(f'Published tree {tree_name} with root {tree.root}')
    return {'status': 'ok'}

def save_global_tree_consistency_proof(global_tree):
    last_root = database['global_tree_consistency_proofs'].find_one(sort=[('root.timestamp', -1)])

    if last_root:
        sublength = last_root['root']['tree_size']
        subroot = last_root['root']['value']
        consistency_proof = global_tree.prove_consistency(sublength, subroot).serialize()
    else:
        consistency_proof = None

    root = {
        'value': trees['global_tree'].root,
        'tree_name': 'global_tree',
        'signature': sign_root(trees['global_tree'].root),
        'timestamp': datetime.now(),
        'tree_size': trees['global_tree'].length
    }
    database['global_tree_consistency_proofs'].insert_one({'root': root, 'consistency_proof': consistency_proof})

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

def trees_list():
    return {'status': 'ok', 'trees': list(trees)}