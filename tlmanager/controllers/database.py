from config.init_fastapi import database

def db_get_all_global_tree_leaves():
    leaves = database['global_tree_leaves'].find()
    return {'leaves': [
        {
            'index': leaf['index'],
            'value': leaf['value']
        } for leaf in leaves
    ]}

def db_get_last_consistency_proof(tree_name):
    consistency_proof = database['consistency_proofs'].find_one({'root.tree_name': tree_name}, sort=[('timestamp', -1)])
    if consistency_proof:
        del consistency_proof['_id']
    return consistency_proof

def db_get_all_consistency_proof(tree_name):
    proofs = database['consistency_proofs'].find({'root.tree_name': tree_name}, sort=[('root.timestamp', -1)])
    proofs = list(proofs)
    for proof in proofs:
        del proof['_id']
    return proofs

def db_get_last_global_tree_root():
    global_tree_root = database['global_tree_roots'].find_one({}, sort=[('timestamp', -1)])
    if global_tree_root:
        del global_tree_root['_id']
    return global_tree_root

def db_insert_global_tree_leaf(index, value,  global_tree_root_object):
    database['global_tree_leaves'].insert_one({
        'index': int(index),
        'value': value
    })
    database['global_tree_roots'].insert_one(global_tree_root_object)
    return {'status': 'ok'}

def db_insert_consistency_proof(root_object, consistency_proof):
    database['consistency_proofs'].insert_one({'root': root_object, 'consistency_proof': consistency_proof})