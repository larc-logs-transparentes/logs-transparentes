from services.trees_states import trees
from services.objects_models import build_local_tree_root_object
from config.init_fastapi import database

def get_inclusion_proof(tree_name, data=None, index=None):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    
    tree = trees[tree_name]
    if index:
        index = int(index)
        if index >= tree.length:
            return { 'status': 'error', 'message': 'Leaf index out of range' }
    else:
        index = tree.find_leaf_index(tree.hash_entry(bytes(data, 'utf-8')))
        if index == None:
            return { 'status': 'error', 'message': 'Data not found in tree' }
        
    proof = tree.prove_inclusion_at(index)

    return {'status': 'ok', 'proof': proof.serialize()}

def get_data_proof(tree_name, data=None, index=None):
    tree = trees[tree_name]
    
    local_proof = get_inclusion_proof(tree_name, data, index)
    if local_proof['status'] == 'error':
        return local_proof
    local_root_object = build_local_tree_root_object(tree)
    
    global_proof = get_inclusion_proof('global_tree', str(local_root_object))
    if global_proof['status'] == 'error':
        return global_proof
    global_root_object = database['global_tree_roots'].find_one({}, sort=[('timestamp', -1)])
    del global_root_object['_id']

    data_proof_object = build_data_proof_object(
        global_root_object, 
        local_root_object, 
        local_proof['proof'], 
        global_proof['proof']
    )

    return data_proof_object

def build_data_proof_object(global_root_object, local_root_object, local_proof_object, data_proof_object):
    return {
        'status': 'ok',
        'global_root': global_root_object,
        'local_tree': {
            'local_root': local_root_object,
            'inclusion_proof': local_proof_object
        },
        'data': {
            'inclusion_proof': data_proof_object
        }   
    }

def get_global_tree_consistency_proof(subroot, sublength):
    global_tree = trees['global_tree']
    
    sublength = int(sublength)
    if sublength > global_tree.length:
        return {'status': 'error', 'message': 'Subtree length out of range'}
    
    proof = global_tree.prove_consistency(sublength, subroot)
    return {'status': 'ok', 'proof': proof.serialize()}

def get_all_consistency_proof():
    return {'status': 'not implemented, yet :)'}
