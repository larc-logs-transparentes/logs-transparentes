from flask import jsonify
from pymerkle import MerkleTree

trees = {'global_tree': MerkleTree()}

def create_tree(tree_name, commitment_size):
    if tree_name in trees:
        return jsonify({'status': 'error', 'message': 'Tree already exists'})
    tree = {'tree': MerkleTree(), 'commitment_size': int(commitment_size)}
    trees[tree_name] = tree
    return jsonify({'status': 'ok', 'message': 'Tree created'})

def insert_leaf(tree_name, data):
    if tree_name not in trees:
        return jsonify({'status': 'error', 'message': 'Tree does not exist'})
    tree = trees[tree_name]['tree']
    hash_leaf = tree.append_entry(bytes(data, 'utf-8'))
    if (tree.length % trees[tree_name]['commitment_size']) == 0:
        # sign tree root
        publish(tree_name) # publish in global_Tree
        # the corresponding consistency-proof is saved in database
    return jsonify({'status': 'ok', 'value': hash_leaf.hex()})

def publish(tree_name):
    if tree_name not in trees:
        return jsonify({'status': 'error', 'message': 'Tree does not exist'})
    tree_root = trees[tree_name]['tree'].root
    global_tree = trees['global_tree']
    global_tree.append_entry(tree_root)
    return jsonify({'status': 'ok'})

def trees_list():
    return jsonify({'status': 'running', 'trees': list(trees)})