from fastapi import APIRouter
from controllers.proofs import *

router = APIRouter()

""" Basic proofs """
@router.get('/inclusion-proof', name="/inclusion-proof", description="Get inclusion proof")
async def inclusion_proof(tree_name: str, data: str|None = None, index: int|None = None):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data and index is None:
        return {'status': 'error', 'message': 'Data or index not specified'}
    return get_inclusion_proof(tree_name, data, index)

@router.get('/global-tree-consistency-proof', name="/global-tree-consistency-proof", description="Get global tree consistency proof")
async def global_tree_consistency_proof(subroot: str, sublength: int):
    if not subroot:
        return {'status': 'error', 'message': 'Subroot not specified'}
    elif sublength is None:
        return {'status': 'error', 'message': 'Sublength not specified'}
    return get_global_tree_consistency_proof(subroot, sublength)

""" High level proofs """
@router.get('/data-proof', name="/data-proof", description="Get proof for a data")
async def data_proof(tree_name: str, data: str|None = None, index: int|None = None):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data and index is None:
        return {'status': 'error', 'message': 'Data or index not specified'}
    return get_data_proof(tree_name, data, index)

@router.get('/all-consistency-proof', name="/all-consistency-proof", description="Get all consistency proof for a tree")
async def all_consistency_proof(tree_name: str):
    return get_all_consistency_proof(tree_name)