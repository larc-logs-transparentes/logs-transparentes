from config.init_database import database, pymongo_errors, gridfs_errors

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

def db_get_one_state(tree_name):
    state = database['state'].find_one({'tree_name': tree_name})
    if state:
        del state['_id']
    else:
        return None
    
    file = gridfs_load(tree_name)
    if file:
        state['hashes'] = file['hashes'] + state['hashes']
    return state

def db_get_all_state():
    state = database['state'].find()
    state = list(state)
    if state:
        for s in state:
            del s['_id']
            file = gridfs_load(s['tree_name'])
            if file:
                s['hashes'] = file['hashes'] + s['hashes']
    return state

def db_insert_global_tree_leaf(index, value,  global_tree_root_object):
    database['global_tree_leaves'].insert_one({
        'index': int(index),
        'value': value
    })
    database['global_tree_roots'].insert_one(global_tree_root_object)
    return {'status': 'ok'}

def db_insert_consistency_proof(root_object, consistency_proof):
    database['consistency_proofs'].insert_one({'root': root_object, 'consistency_proof': consistency_proof})


def db_update_state(tree_name, state):
    try:
        database['state'].update_one({'tree_name': tree_name}, {'$set': state}, upsert=True)
    except pymongo_errors.DocumentTooLarge:
        gridfs_save(tree_name, state)
        database['state'].update_one({'tree_name': tree_name}, {'$set': {'hashes': []}}, upsert=True)

def gridfs_save(filename, state):
    try:
        last_file = database.fs.get_last_version(filename).read()
        last_file = eval(last_file.decode('utf-8'))
        state['hashes'] = last_file['hashes'] + state['hashes']
    except gridfs_errors.NoFile:
        pass
    database.fs.put(bytes(str(state), 'utf-8'), filename=filename)

def gridfs_load(filename):
    try:
        last_file = database.fs.get_last_version(filename).read()
        last_file = eval(last_file.decode('utf-8'))
        return last_file
    except gridfs_errors.NoFile:
        return None