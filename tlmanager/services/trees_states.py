from config.init_database import database

from pymongo import errors as pymongo_errors
from gridfs import errors as gridfs_errors

from transparentlogs_pymerkle import MerkleTree 
from datetime import datetime

COMMITMENT_SIZE_GLOBAL_TREE = 2

def save_state(tree, inserted_leaves=None):
    last_state = database['state'].find_one({'tree_name': tree.tree_name})
    if last_state:
        del last_state['_id']
        last_state['tree_size'] = tree.length
    else:
        last_state = {
            'tree_name': tree.tree_name,
            'commitment_size': tree.commitment_size,
            'tree_size': 0,
            'hashes': []
        }

    state = { 'timestamp': datetime.now().isoformat() } | last_state
    if inserted_leaves:
        state['hashes'].extend(inserted_leaves)
        
    try:
        database['state'].update_one({'tree_name': tree.tree_name}, {'$set': state}, upsert=True)
    except pymongo_errors.DocumentTooLarge:
        try:
            last_state_saved = database.fs.get_last_version(tree.tree_name).read()
            last_state_saved = eval(last_state_saved.decode('utf-8'))
            state['hashes'] = last_state_saved['hashes'] + state['hashes']
        except gridfs_errors.NoFile:
            pass
        database.fs.put(bytes(str(state), 'utf-8'), filename=tree.tree_name)
        database['state'].update_one({'tree_name': tree.tree_name}, {'$set': {'hashes': []}}, upsert=True)

def load_last_state():
    state = list(database['state'].find())
    if not state:
        global_tree = MerkleTree()
        global_tree.tree_name = 'global_tree'
        global_tree.commitment_size = COMMITMENT_SIZE_GLOBAL_TREE
        save_state(global_tree)
        return {'global_tree': global_tree}
    
    trees = {}
    for tree_state in state:
        try:
            last_state_saved = database.fs.get_last_version(tree_state['tree_name']).read()
            last_state_saved = eval(last_state_saved.decode('utf-8'))
            tree_state['hashes'] = last_state_saved['hashes'] + tree_state['hashes']
        except gridfs_errors.NoFile:
            pass

        tree = MerkleTree()
        tree.tree_name = tree_state['tree_name']
        tree.commitment_size = tree_state['commitment_size']
        tree.entries_buffer = []
        for hash_leaf in tree_state['hashes']:
            print(f'loading tree {tree.tree_name} {tree.length / tree_state["tree_size"] * 100:.2f}%', end='\r')
            tree.append_entry(hash_leaf, encoding=False)
        print(f'loading tree {tree.tree_name} {tree.length / tree_state["tree_size"] * 100:.2f}%')
        trees[tree.tree_name] = tree

    return trees

trees = load_last_state()