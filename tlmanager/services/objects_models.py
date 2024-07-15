from datetime import datetime
from services.keys import sign_root

def build_local_tree_root_object(tree):
    return {
        'value': tree.root.decode('utf-8'),
        'tree_name': tree.tree_name,
        'tree_size': tree.length,
    }

def build_global_tree_root_object(global_tree):
    return {
        'value': global_tree.root.decode('utf-8'),
        'tree_name': global_tree.tree_name,
        'tree_size': global_tree.length,
        'signature': sign_root(global_tree.root),
        'timestamp': datetime.now().isoformat()
    }

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

def build_state_object(tree, hashes):
    return {
        'timestamp': datetime.now().isoformat(),
        'tree_name': tree.tree_name,
        'tree_size': tree.length,
        'commitment_size': tree.commitment_size,
        'hashes': hashes
    }