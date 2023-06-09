from fastapi.responses import JSONResponse
import json
from services.trees_states import trees
from services.objects_models import build_local_tree_root_object
from controllers.database import db_get_all_consistency_proof, db_get_last_global_tree_root

def get_inclusion_proof(tree_name, data=None, index=None):
    if tree_name not in trees:
        return JSONResponse({'status': 'error', 'message': 'Tree does not exist'}, status_code=400)
    
    tree = trees[tree_name]
    if index is not None:
        index = int(index)
        if index >= tree.length:
            return JSONResponse({'status': 'error', 'message': 'Leaf index out of range'}, status_code=400)
    else:
        index = tree.find_leaf_index(tree.hash_entry(bytes(data, 'utf-8')))
        if index == None:
            return JSONResponse({ 'status': 'error', 'message': 'Data not found in tree' }, status_code=400)
        
    proof = tree.prove_inclusion_at(index)

    return JSONResponse({'status': 'ok', 'proof': proof.serialize()}, status_code=200)

def get_data_proof(tree_name, data=None, index=None):
    if tree_name not in trees:
        return JSONResponse({'status': 'error', 'message': 'Tree does not exist'}, status_code=400)
    if tree_name == 'global_tree':
        return JSONResponse({'status': 'error', 'message': 'Data proof is available only for local trees'}, status_code=400)
    
    tree = trees[tree_name]
    
    local_proof = json.loads(get_inclusion_proof(tree_name, data, index).body.decode('utf-8'))
    if local_proof['status'] == 'error':
        return local_proof
    local_root_object = build_local_tree_root_object(tree)
    
    global_proof = json.loads(get_inclusion_proof('global_tree', str(local_root_object)).body.decode('utf-8'))
    if global_proof['status'] == 'error':
        return global_proof
    global_root_object = db_get_last_global_tree_root()
    
    data_proof_object = build_data_proof_object(
        global_root_object, 
        local_root_object, 
        local_proof['proof'], 
        global_proof['proof']
    )

    return JSONResponse(data_proof_object, status_code=200)

def build_data_proof_object(global_root_object, local_root_object, local_proof_object, data_proof_object):
    local_root_object['value'] = local_root_object['value'].decode('utf-8')

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
        return JSONResponse({'status': 'error', 'message': 'Subtree length out of range'}, status_code=400)
    
    try:
        proof = global_tree.prove_consistency(sublength, subroot)
    except:
        return JSONResponse({'status': 'error', 'message': 'Consistency proof for provided subroot was not found'}, status_code=400)

    return JSONResponse({'status': 'ok', 'proof': proof.serialize()}, status_code=200)

def get_all_consistency_proof(tree_name):
    if tree_name not in trees:
        return JSONResponse({'status': 'error', 'message': 'Tree does not exist'}, status_code=400)
    
    proofs = db_get_all_consistency_proof(tree_name)
    if len(proofs) == 0:
        return JSONResponse({'status': 'error', 'message': 'No proofs found'}, status_code=400)
    
    return JSONResponse({'status': 'ok', 'proofs': proofs}, status_code=200)