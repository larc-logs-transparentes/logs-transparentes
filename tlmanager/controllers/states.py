from config.fastapi import app, database
from .lib.pymerkle import MerkleTree

from datetime import datetime

COMMITMENT_SIZE_GLOBAL_TREE = 4

def save_state(trees):
    state = {}
    for tree_name, tree in trees.items():
        state[tree_name] = {
            'metadata': tree['tree'].get_metadata(),
            'commitment_size': tree['commitment_size'],
            'hashes': [tree['tree'].leaf(i) for i in range(tree['tree'].length)]
        }
   
    database['state'].insert_one({
        'timestamp': datetime.now(),
        'state': state
    })
    return {'status': 'ok'}

def load_last_state():
    state = database['state'].find_one(sort=[('timestamp', -1)])
    if not state:
        trees = {'global_tree': {'tree': MerkleTree(), 'commitment_size': COMMITMENT_SIZE_GLOBAL_TREE}}
        save_state(trees)
        return trees
    
    trees = {}
    for tree_name, tree in state['state'].items():
        trees[tree_name] = {
            'tree': MerkleTree(),
            'commitment_size': tree['commitment_size']
        }
        for hash in tree['hashes']:
            trees[tree_name]['tree'].append_entry(hash, encoding=False)
    return trees

trees = load_last_state()
