#fastapi
from fastapi import FastAPI, Request
from controllers.trees import *

app = FastAPI()

@app.get('/')
async def index():
    return trees_list()

""" Tree management """
@app.get('/tree-create')  
async def tree_create(request: Request):
    tree_name = request.query_params['tree-name']
    commitment_size = request.query_params['commitment-size']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not commitment_size:
        return {'status': 'error', 'message': 'Commitment size not specified'}
    return create_tree(tree_name, commitment_size)


@app.post('/insert-leaf')
async def tree_insert_leaf(request: Request):
    req_data = await request.json()
    tree_name = req_data['tree-name']
    data = req_data['data']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data:
        return {'status': 'error', 'message': 'Data not specified'}
    return insert_leaf(tree_name, data)

@app.get('/leaf')
async def leaf(request: Request):
    tree_name = request.query_params['tree-name']
    index = request.query_params['index']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not index:
        return {'status': 'error', 'message': 'Index not specified'}
    return get_leaf(tree_name, index)

@app.get('/tree')
async def tree(request: Request):
    tree_name = request.query_params['tree-name']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return get_tree(tree_name)

@app.post('/tree/publish')
async def tree_publish(request: Request):
    req_data = await request.json()
    tree_name = req_data['tree-name']
    
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return publish(tree_name)