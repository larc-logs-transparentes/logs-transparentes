from pymerkle import MerkleTree
import time

trees = {'global_tree': {'tree': MerkleTree(), 'commitment_size': 1}}

def create_tree(tree_name, commitment_size):
    if tree_name in trees:
        return {'status': 'error', 'message': 'Tree already exists'}
    tree = {'tree': MerkleTree(), 'commitment_size': int(commitment_size)}
    trees[tree_name] = tree
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
    return {'status': 'ok', 'value': hash_leaf}

def publish(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree_root = trees[tree_name]['tree'].root
    global_tree = trees['global_tree']['tree']
    global_tree.append_entry(tree_root) # hash de hash ?
    print(f'Published tree {tree_name} with root {tree_root}')
    return {'status': 'ok'}

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
        leaf = tree.get_leaf(leaf_index)
        offset, path = tree.generate_inclusion_path(leaf)
        proof = tree.build_proof(offset, path)
    else:
        proof = tree.prove_inclusion(bytes(data, 'utf-8'))
    return proof.serialize()