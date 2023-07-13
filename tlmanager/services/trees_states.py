from controllers.database import db_get_one_state, db_update_state, db_get_all_state
from services.objects_models import build_state_object

from transparentlogs_pymerkle import MerkleTree 

def save_state(tree, list_entries=[]):
    last_state = db_get_one_state(tree.tree_name)
    if last_state: 
        # update state
        state = build_state_object(tree, last_state['hashes'] + list_entries)
    else: 
        # create state
        state = build_state_object(tree, list_entries)
        
    db_update_state(tree.tree_name, state)

def load_state():
    state = db_get_all_state()
    trees = __init_trees_from_state(state)
    return trees

def __init_trees_from_state(state):
    if not state:
        return __init_global_tree()
    
    trees = {}
    for tree_state in state:
        tree = MerkleTree()
        tree.tree_name = tree_state['tree_name']
        tree.commitment_size = tree_state['commitment_size']
        tree.entries_buffer = []
        for hash_leaf in tree_state['hashes']:
            print(f'loading tree "{tree.tree_name}" {tree.length / tree_state["tree_size"] * 100:.0f}%', end='\r')
            tree.append_entry(hash_leaf, encoding=False)
        print(f'loading tree "{tree.tree_name}" 100%', flush=True)
        trees[tree.tree_name] = tree
    return trees

def __init_global_tree():
    global_tree = MerkleTree()
    global_tree.tree_name = 'global_tree'
    global_tree.commitment_size = 1
    save_state(global_tree)
    return {'global_tree': global_tree}

trees = load_state()