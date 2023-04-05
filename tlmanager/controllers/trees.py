from config.fastapi import database
from controllers.states import trees, save_state

from datetime import datetime
from .lib.pymerkle import MerkleTree

""" 
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
    tree = {'tree': MerkleTree(), 'commitment_size': int(commitment_size)}
    trees[tree_name] = tree
    save_state(trees)
    return {'status': 'ok', 'message': 'Tree created'}

def insert_leaf(tree_name, data):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]['tree']
    hash_leaf = tree.append_entry(bytes(data, 'utf-8'))
    if (tree.length % trees[tree_name]['commitment_size']) == 0:
        # sign tree root
        publish(tree_name) # publish in global_Tree
        # the corresponding consistency-proof is saved in database
    
    save_state(trees)
    return {'status': 'ok', 'value': hash_leaf}

def publish(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree_root = trees[tree_name]['tree'].root
    global_tree = trees['global_tree']['tree']
    global_tree.append_entry(tree_root, encoding=False)
    
    if (global_tree.length % trees['global_tree']['commitment_size']) == 0:
        save_global_tree_consistency_proof(global_tree)

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
        'value': trees['global_tree']['tree'].root,
        'tree_name': 'global_tree',
        'signature': '0x',
        'timestamp': datetime.now(),
        'tree_size': trees['global_tree']['tree'].length
    }
    database['global_tree_consistency_proofs'].insert_one({'root': root, 'consistency_proof': consistency_proof})

def get_leaf(tree_name, leaf_index):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]['tree']
    if int(leaf_index) >= tree.length:
        return {'status': 'error', 'message': 'Leaf index out of range'}
    leaf = tree.leaf(int(leaf_index))
    return {'status': 'ok', 'value': leaf}

def get_tree(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]['tree']
    metadata = tree.get_metadata()

    hashes = [tree.leaf(i) for i in range(tree.length)]

    return {'status': 'ok'} | metadata | {'hashes': hashes}

def get_tree_root(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]['tree']
    return {'status': 'ok', 'value': tree.root}

def trees_list():
    return {'status': 'running', 'trees': list(trees)}

def get_inclusion_proof(tree_name, data, leaf_index):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    
    tree = trees[tree_name]['tree']
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

    global_tree = trees['global_tree']['tree']
    tree = trees[tree_name]['tree']
    global_proof = global_tree.prove_inclusion(tree.root, checksum=False)

    global_root = {
        'value': global_tree.root,
        'tree_name': 'global_tree',
        'signature': '0x',
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

