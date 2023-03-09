from flask import Flask, request, jsonify
from controllers.trees import *

app = Flask('tlmanager')

@app.route('/')
def index():
    return trees_list()

@app.route('/tree-create')  
def tree_create():
    tree_name = request.args.get('tree-name')
    commitment_size = request.args.get('commitment-size')
    if not tree_name:
        return jsonify({'status': 'error', 'message': 'Tree name not specified'})
    elif not commitment_size:
        return jsonify({'status': 'error', 'message': 'Commitment size not specified'})
    return create_tree(tree_name, commitment_size)

@app.route('/tree-insert-leaf', methods=['POST'])
def tree_insert_leaf():
    req_data = request.get_json()
    tree_name = req_data['tree-name']
    data = req_data['data']
    if not tree_name:
        return jsonify({'status': 'error', 'message': 'Tree name not specified'})
    elif not data:
        return jsonify({'status': 'error', 'message': 'Data not specified'})
    return insert_leaf(tree_name, data)

if __name__ == '__main__':
    app.run()