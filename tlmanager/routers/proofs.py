from fastapi import APIRouter
from fastapi.responses import JSONResponse
from controllers.proofs import *
from docs.proofs_descriptions import descriptions
from docs.DTOs.proofs.responses import *

router = APIRouter()

""" Basic proofs """
@router.get('/inclusion-proof', name="/inclusion-proof", description=descriptions['inclusion_proof'], responses={200: {'model': DTOPymerkleProof}})
async def inclusion_proof(tree_name: str, data: str|None = None, index: int|None = None):
    if not tree_name:
        return JSONResponse({'status': 'error', 'message': 'Tree name not specified'}, status_code=400)
    elif not data and index is None:
        return JSONResponse({'status': 'error', 'message': 'Data or index not specified'}, status_code=400)
    return get_inclusion_proof(tree_name, data, index)

@router.get('/global-tree-consistency-proof', name="/global-tree-consistency-proof", description=descriptions['global_tree_consistency_proof'], responses={200: {'model': DTOPymerkleProof}})
async def global_tree_consistency_proof(subroot: str, sublength: int):
    if not subroot:
        return JSONResponse({'status': 'error', 'message': 'Subroot not specified'}, status_code=400)
    elif sublength is None:
        return JSONResponse({'status': 'error', 'message': 'Sublength not specified'}, status_code=400)
    return get_global_tree_consistency_proof(subroot, sublength)

""" High level proofs """
@router.get('/data-proof', name="/data-proof", description=descriptions['data_proof'], responses={200: {'model': DTODataProof}})
async def data_proof(tree_name: str, data: str|None = None, index: int|None = None):
    if not tree_name:
        return JSONResponse({'status': 'error', 'message': 'Tree name not specified'}, status_code=400)
    elif not data and index is None:
        return JSONResponse({'status': 'error', 'message': 'Data or index not specified'}, status_code=400)
    return get_data_proof(tree_name, data, index)

@router.get('/all-consistency-proof', name="/all-consistency-proof", description=descriptions['all_consistency_proof'], responses={200: {'model': DTOAllConsistencyProof}})
async def all_consistency_proof(tree_name: str):
    return get_all_consistency_proof(tree_name)