from config.init_fastapi import database
from controllers.trees_states import trees, save_state
from controllers.keys import sign_root

from datetime import datetime
from .lib.pymerkle import MerkleTree


""" Models

root = {
	value: <string>,
	tree_name: <string>,
	signature: <hex>,
	timestamp: <>,
	tree_size: <int>
}
"""

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
        publish(tree_name)    
    save_state(tree, hash_leaf)
    return {'status': 'ok', 'value': hash_leaf}

# assinar o root da árvore
def publish(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree_root = trees[tree_name].root
    global_tree = trees['global_tree']
    global_tree.append_entry(tree_root, encoding=False)
    
    if (global_tree.length % trees['global_tree'].commitment_size) == 0:
        save_global_tree_consistency_proof(global_tree)
    save_state(global_tree, tree_root)

    print(f'Published tree {tree_name} with root {tree_root}')
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

def get_inclusion_proof(tree_name, data, leaf_index):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    
    tree = trees[tree_name]
    if leaf_index:
        leaf_index = int(leaf_index)
        if leaf_index >= tree.length:
            return {'status': 'error', 'message': 'Leaf index out of range'}
        proof = tree.prove_inclusion_at(leaf_index)
    else:
        proof = tree.prove_inclusion(bytes(data, 'utf-8'))
    return {'status': 'ok', 'proof': proof.serialize()}

def get_data_proof(tree_name, data, index):
    local_proof = get_inclusion_proof(tree_name, data, index)
    if local_proof['status'] == 'error':
        return local_proof
    else:
        local_proof = local_proof['proof']

    global_tree = trees['global_tree']
    tree = trees[tree_name]
    global_proof = global_tree.prove_inclusion(tree.root, checksum=False)

    global_root = {
        'value': global_tree.root,
        'tree_name': 'global_tree',
        'signature': sign_root(global_tree.root),
        'timestamp': datetime.now(),
        'tree_size': global_tree.length
    } 
    return {
        'status': 'ok',
        'global_root': global_root,
        'local_tree': {
            'local_root': tree.root,
            'inclusion_proof': local_proof
        },
        'data': {
            'inclusion_proof': global_proof.serialize()
        }
    }

def get_global_tree_consistency_proof(subroot, sublength):
    global_tree = trees['global_tree']['tree']
    
    sublength = int(sublength)
    if sublength > global_tree.length:
        return {'status': 'error', 'message': 'Subtree length out of range'}
    
    proof = global_tree.prove_consistency(sublength, subroot)
    return {'status': 'ok', 'proof': proof.serialize()}

