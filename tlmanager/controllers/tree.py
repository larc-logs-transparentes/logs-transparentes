from fastapi.responses import JSONResponse
from controllers.database import *
from services.trees_states import trees, save_state
from services.objects_models import build_global_tree_root_object, build_local_tree_root_object

from transparentlogs_pymerkle import MerkleTree

def create_tree(tree_name, commitment_size):
    if tree_name in trees:
        return JSONResponse({'status': 'error', 'message': 'Tree already exists'}, status_code=400)
    tree = MerkleTree()
    tree.tree_name = tree_name
    tree.commitment_size = int(commitment_size)
    tree.entries_buffer = []
    trees[tree_name] = tree
    save_state(tree)
    return JSONResponse({'status': 'ok', 'message': 'Tree created'}, status_code=200)

def insert_leaf(tree_name, data):
    if tree_name not in trees:
        return JSONResponse({'status': 'error', 'message': 'Tree does not exist'}, status_code=400)
    tree = trees[tree_name]
    hash_leaf = tree.hash_entry(data)
    tree.entries_buffer.append(hash_leaf)
    index = tree.length + len(tree.entries_buffer) - 1
    if (len(tree.entries_buffer) >= tree.commitment_size):
        commit_local_tree(tree_name)    
        return JSONResponse({'status': 'ok', 'value': hash_leaf.decode('utf-8'), 'index': index, 'message': 'Commited'}, status_code=200)
    return JSONResponse({'status': 'ok', 'value': hash_leaf.decode('utf-8'), 'index': index, 'message': 'Pending'}, status_code=200)

def commit_local_tree(tree_name):
    if tree_name not in trees:
        return JSONResponse({'status': 'error', 'message': 'Tree does not exist'}, status_code=400)

    if tree_name == 'global_tree':
        return JSONResponse({'status': 'error', 'message': 'Global tree cannot be commited'}, status_code=400)
    
    tree = trees[tree_name]
    if len(tree.entries_buffer) == 0:
        return JSONResponse({'status': 'error', 'message': 'Tree does not have entries to commit'}, status_code=400)
    
    for entry in tree.entries_buffer:
        tree.append_entry(entry, encoding=False)
    save_state(tree, tree.entries_buffer)
    tree.entries_buffer = []

    tree_root = build_local_tree_root_object(tree)
    save_consistency_proof(tree_name, tree_root)
    append_global_tree(tree_root)

    print(f'Commited tree {tree_name} with root {tree.root}')
    return JSONResponse({'status': 'ok'}, status_code=200)

def append_global_tree(entry):    
    global_tree = trees['global_tree']
    hash_entry = global_tree.append_entry(str(entry))
    save_state(global_tree, [hash_entry])
    
    global_root = build_global_tree_root_object(global_tree)
    db_insert_global_tree_leaf(global_tree.length - 1, entry, global_root)

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
        return JSONResponse({'status': 'error', 'message': 'Tree does not exist'}, status_code=400)
    tree = trees[tree_name]
    if int(leaf_index) >= tree.length:
        return JSONResponse({'status': 'error', 'message': 'Leaf index out of range'}, status_code=400)
    leaf = tree.leaf(int(leaf_index)).decode('utf-8')
    return JSONResponse({'status': 'ok', 'value': leaf}, status_code=200)

def get_tree(tree_name):
    if tree_name not in trees:
        return JSONResponse({'status': 'error', 'message': 'Tree does not exist'}, status_code=400)
    tree = trees[tree_name]
    metadata = tree.get_metadata()
    buffer_length = len(tree.entries_buffer)

    if tree_name == 'global_tree':
        return JSONResponse({'status': 'ok'} | metadata | {'length': tree.length}, status_code=200)
    
    return JSONResponse({'status': 'ok'} | metadata | {'commitment size': tree.commitment_size, 'length': tree.length, 'buffer_length': buffer_length}, status_code=200)

def get_tree_root(tree_name):
    if tree_name not in trees:
        return JSONResponse({'status': 'error', 'message': 'Tree does not exist'}, status_code=400)
    tree = trees[tree_name]
    return {'status': 'ok', 'value': tree.root}

def get_global_tree_all_leaves():
    return JSONResponse({'status': 'ok'} | db_get_all_global_tree_leaves(), status_code=200)

def get_global_tree_root(tree_size=None):
    global_tree = trees['global_tree']
    if not global_tree.length:
        return JSONResponse({'status': 'error', 'message': 'Global tree is empty'}, status_code=400)
    
    if tree_size:
        tree_size = int(tree_size)
        if tree_size > global_tree.length:
            return JSONResponse({'status': 'error', 'message': 'Tree size out of range'}, status_code=400)
        
    return JSONResponse({'status': 'ok', 'root': db_get_global_tree_root(tree_size)}, status_code=200)

def get_global_tree_all_roots():
    return JSONResponse({'status': 'ok', 'roots': db_get_all_global_tree_roots()}, status_code=200)

def trees_list():
    return JSONResponse({'status': 'ok', 'trees': list(trees)}, status_code=200)