from config.init_database import database

from transparentlogs_pymerkle import MerkleTree 
from datetime import datetime

COMMITMENT_SIZE_GLOBAL_TREE = 2

def save_state(tree, inserted_leaves=None):
    try:
        last_state = database.fs.get_last_version(tree.tree_name).read()
        last_state = eval(last_state.decode('utf-8')) if last_state else None
    except:
        last_state = {
            'tree_name': tree.tree_name,
            'commitment_size': tree.commitment_size,
            'hashes': []
        }
    
    state = { 'timestamp': datetime.now().isoformat() } | last_state
    if inserted_leaves:
        state['hashes'].extend(inserted_leaves)
    
    database.fs.put(bytes(str(state), 'utf-8'), filename=tree.tree_name)
    

def load_last_state():
    trees = {}
    if not database.fs.list():
        global_tree = MerkleTree()
        global_tree.tree_name = 'global_tree'
        global_tree.commitment_size = COMMITMENT_SIZE_GLOBAL_TREE
        save_state(global_tree)
        return {'global_tree': global_tree}
    
    for tree_name in database.fs.list():
        state = database.fs.get_last_version(tree_name).read()
        state = eval(state.decode('utf-8'))
        tree = MerkleTree()
        tree.tree_name = tree_name
        tree.commitment_size = state['commitment_size']
        tree.entries_buffer = []
        for hash_leaf in state['hashes']:
            tree.append_entry(hash_leaf, encoding=False)
        trees[tree.tree_name] = tree
    return trees 
    
    
    """ state = list(database['state'].find())
    if not state:
        global_tree = MerkleTree()
        global_tree.tree_name = 'global_tree'
        global_tree.commitment_size = COMMITMENT_SIZE_GLOBAL_TREE
        save_state(global_tree)
        return {'global_tree': global_tree}

    trees = {}
    for tree_state in state:
        tree = MerkleTree()
        tree.tree_name = tree_state['tree_name']
        tree.commitment_size = tree_state['commitment_size']
        tree.entries_buffer = []
        for hash_leaf in tree_state['hashes']:
            tree.append_entry(hash_leaf, encoding=False)
        trees[tree.tree_name] = tree
    return trees """

trees = load_last_state()