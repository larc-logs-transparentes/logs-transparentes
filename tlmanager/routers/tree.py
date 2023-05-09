from fastapi import APIRouter, Request
from controllers.tree import *

router = APIRouter()

@router.post('/tree-create', tags=["tree"])
async def tree_create(request: Request):
    req_data = await request.json()
    tree_name = req_data['tree-name']
    commitment_size = req_data['commitment-size']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not commitment_size:
        return {'status': 'error', 'message': 'Commitment size not specified'}
    return create_tree(tree_name, commitment_size)

@router.get('/tree', tags=["tree"])
async def tree(request: Request):
    tree_name = request.query_params['tree-name']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return get_tree(tree_name)

@router.post('/insert-leaf', tags=["tree"])
async def tree_insert_leaf(request: Request):
    req_data = await request.json()
    tree_name = req_data['tree-name']
    data = req_data['data']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data:
        return {'status': 'error', 'message': 'Data not specified'}
    return insert_leaf(tree_name, data)

@router.get('/leaf', tags=["tree"])
async def leaf(request: Request):
    tree_name = request.query_params['tree-name']
    index = request.query_params['index']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not index:
        return {'status': 'error', 'message': 'Index not specified'}
    return get_leaf(tree_name, index)

@router.get('/tree/root', tags=["tree"])
async def tree_root(request: Request):
    tree_name = request.query_params['tree-name']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return get_tree_root(tree_name)

@router.post('/tree/commit', tags=["tree"])
async def tree_publish(request: Request):
    req_data = await request.json()
    tree_name = req_data['tree-name']
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return commit_local_tree(tree_name)

@router.get('/global-tree/all-leaf-data', tags=["tree"])
async def global_tree_all_leaves(request: Request):
    return get_global_tree_all_leaves()