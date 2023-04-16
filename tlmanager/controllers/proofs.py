from services.trees_states import trees
from services.keys import sign_root
from config.init_database import database
from datetime import datetime

def get_inclusion_proof(tree_name, data, leaf_index):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    
    tree = trees[tree_name]
    if not data:
        leaf_index = int(leaf_index)
        if leaf_index >= tree.length:
            return {'status': 'error', 'message': 'Leaf index out of range'}
        proof = tree.prove_inclusion_at(leaf_index)
    else:
        proof = tree.prove_inclusion(bytes(data, 'utf-8'))
    return {'status': 'ok', 'proof': proof.serialize()}

def get_data_proof(tree_name, data, index):
    tree = trees[tree_name]
    if not index:
        index = tree.find_leaf_index(tree.hash_entry(bytes(data, 'utf-8')))
        if index is None:
            return { 'status': 'error', 'message': 'Data not found in tree' }
    else:
        index = int(index)
        if index >= tree.length:
            return { 'status': 'error', 'message': 'Leaf index out of range' }
    
    local_proof = get_inclusion_proof(tree_name, data, index)
    if local_proof['status'] == 'error':
        return local_proof
    else:
        local_proof = local_proof['proof']

    global_tree = trees['global_tree']        
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
    global_tree = trees['global_tree']
    
    sublength = int(sublength)
    if sublength > global_tree.length:
        return {'status': 'error', 'message': 'Subtree length out of range'}
    
    proof = global_tree.prove_consistency(sublength, subroot)
    return {'status': 'ok', 'proof': proof.serialize()}

def get_all_consistency_proof():
    consistency_proofs = database['global_tree_consistency_proofs'].find()
    response = []
    for proof in consistency_proofs:
        response.append({
            'root': proof['root'],
            'consistency-proof': proof['consistency_proof']
        })
    return {'status': 'ok', 'proofs': response}
