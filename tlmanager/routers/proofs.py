from fastapi import APIRouter, Request
from controllers.proofs import *

router = APIRouter()

""" Basic proofs """
@router.get('/inclusion-proof', tags=["proofs"])
async def inclusion_proof(request: Request):
    tree_name = request.query_params['tree-name']
    data = None
    if 'data' in request.query_params:
        data = request.query_params['data']

    index = None
    if 'index' in request.query_params:
        index = request.query_params['index']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data and not index:
        return {'status': 'error', 'message': 'Data or index not specified'}
    return get_inclusion_proof(tree_name, data, index)

@router.get('/global-tree-consistency-proof')
async def global_tree_consistency_proof(request: Request):
    subroot = request.query_params['subroot']
    sublength = request.query_params['sublength']

    if not subroot:
        return {'status': 'error', 'message': 'Subroot not specified'}
    elif not sublength:
        return {'status': 'error', 'message': 'Sublength not specified'}
    return get_global_tree_consistency_proof(subroot, sublength)

""" Hign level proofs """
@router.get('/data-proof')
async def data_proof(request: Request):
    tree_name = request.query_params['tree-name']
    data = None
    if 'data' in request.query_params:
        data = request.query_params['data']

    index = None
    if 'index' in request.query_params:
        index = request.query_params['index']

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data and not index:
        return {'status': 'error', 'message': 'Data or index not specified'}
    return get_data_proof(tree_name, data, index)

@router.get('/all-consistency-proof')
async def all_consistency_proof(request: Request):
    return get_all_consistency_proof()