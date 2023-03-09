from pymerkle import MerkleTree

trees = {'global_tree': MerkleTree()}

def create_tree(tree_name, commitment_size):
    if tree_name in trees:
        return {'status': 'error', 'message': 'Tree already exists'}
    tree = {'tree': MerkleTree(), 'commitment_size': int(commitment_size)}
    trees[tree_name] = tree
    return {'status': 'ok', 'message': 'Tree created'}

def insert_leaf(tree_name, data):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree = trees[tree_name]['tree']
    hash_leaf = tree.append_entry(bytes(data, 'utf-8'))
    if (tree.length % trees[tree_name]['commitment_size']) == 0:
        # sign tree root
        publish(tree_name) # publish in global_Tree
        print('Tree root published')
        # the corresponding consistency-proof is saved in database
    return {'status': 'ok', 'value': hash_leaf.hex()}

def publish(tree_name):
    if tree_name not in trees:
        return {'status': 'error', 'message': 'Tree does not exist'}
    tree_root = trees[tree_name]['tree'].root
    global_tree = trees['global_tree']
    global_tree.append_entry(tree_root)
    return {'status': 'ok'}

def trees_list():
    return {'status': 'running', 'trees': list(trees)}