from config.init_database import database

from lib.pymerkleLT import MerkleTree
from datetime import datetime

COMMITMENT_SIZE_GLOBAL_TREE = 2

def save_state(tree, inserted_leaf=None, published_root=False):
    last_state = database['state'].find_one(sort=[('timestamp', -1)])
 
    if tree.tree_name not in last_state['state']: #new tree
        last_state['state'][tree.tree_name] = { 
            'hashes': [],
            'commitment_size': tree.commitment_size,
            'last_published_root': None
        }
    
    if inserted_leaf:
        last_state['state'][tree.tree_name]['hashes'].append(inserted_leaf)
        if published_root:
            last_state['state'][tree.tree_name]['last_published_root'] = tree.root

    state = {
        'timestamp': datetime.now(),
        'state': last_state['state']
    }

    database['state'].update_one({'timestamp': last_state['timestamp']}, {'$set': state}, upsert=True)
  

def load_last_state():
    state = database['state'].find_one(sort=[('timestamp', -1)])
    if not state: #initial state
        state = {
            'timestamp': datetime.now(),
            'state': {
                'global_tree': {
                    'hashes': [],
                    'commitment_size': COMMITMENT_SIZE_GLOBAL_TREE,
                    'last_published_root': None
                }
            }
        }
        database['state'].insert_one(state)

    trees = {}
    for tree_name, tree_state in state['state'].items():
        tree = MerkleTree()
        tree.tree_name = tree_name
        tree.commitment_size = tree_state['commitment_size']
        tree.last_published_root = tree_state['last_published_root']
        for hash_leaf in tree_state['hashes']:
            tree.append_entry(hash_leaf, encoding=False)
        trees[tree_name] = tree
    return trees

trees = load_last_state()