from fastapi import APIRouter
from controllers.tree import *
from docs.models.requests import Tree, Leaf, Commit
from docs.descriptions.tree_descriptions import descriptions
from docs.DTOs.tree import *
import base64

router = APIRouter()

@router.post('/tree-create', name="/tree-create", description=descriptions['tree_create'], responses={200: {'model': DTOTreeCreate}})
async def tree_create(tree: Tree):
    tree_name = tree.tree_name
    commitment_size = tree.commitment_size

    if not tree_name:
        return JSONResponse({'status': 'error', 'message': 'Tree name not specified'}, status_code=400)
    elif not commitment_size:
        return JSONResponse({'status': 'error', 'message': 'Commitment size not specified'}, status_code=400)
    return create_tree(tree_name, commitment_size)


@router.post('/insert-leaf', name="/insert-leaf", description=descriptions['insert_leaf'], responses={200: {'model': DTOInsertLeaf}})
async def tree_insert_leaf(leaf: Leaf):
    tree_name = leaf.tree_name
    data = leaf.data

    if not tree_name:
        return JSONResponse({'status': 'error', 'message': 'Tree name not specified'}, status_code=400)
    elif not data:
        return JSONResponse({'status': 'error', 'message': 'Data not specified'}, status_code=400)
    try:
        decoded_data = base64.b64decode(data)
        if base64.b64encode(decoded_data) != data:
            return JSONResponse({'status': 'error', 'message': 'Data is not base64 encoded'}, status_code=400)
        return insert_leaf(tree_name, decoded_data)
    except:
        return JSONResponse({'status': 'error', 'message': 'Data is not base64 encoded'}, status_code=400)


@router.post('/tree/commit', name="/tree/commit", description=descriptions['tree_commit'], responses={200: {'model': DTOCommit}})
async def tree_publish(commit: Commit):
    tree_name = commit.tree_name

    if not tree_name:
        return JSONResponse({'status': 'error', 'message': 'Tree name not specified'}, status_code=400)
    return commit_local_tree(tree_name)

@router.get('/tree', name="/tree", description=descriptions['tree_metadata'], responses={200: {'model': DTOTreeMetadata}})
async def tree(tree_name: str):
    if not tree_name:
        return JSONResponse({'status': 'error', 'message': 'Tree name not specified'}, status_code=400)
    return get_tree(tree_name)

@router.get('/tree/root', name="/tree/root", description=descriptions['tree_root'], responses={200: {'model': DTONodeHash}})
async def tree_root(tree_name: str):
    if not tree_name:
        return JSONResponse({'status': 'error', 'message': 'Tree name not specified'}, status_code=400)
    return get_tree_root(tree_name)

@router.get('/leaf', name="/leaf", description=descriptions['tree_leaf'], responses={200: {'model': DTONodeHash}})
async def leaf(tree_name: str, index: int):
    if not tree_name:
        return JSONResponse({'status': 'error', 'message': 'Tree name not specified'}, status_code=400)
    elif not index:
        return JSONResponse({'status': 'error', 'message': 'Index not specified'}, status_code=400)
    return get_leaf(tree_name, index)

@router.get('/global-tree/root', name="/global-tree/root", description=descriptions['global_tree_root'], responses={200: {'model': DTOGlobalTreeRoot}})
async def global_tree_root(tree_size: int|None = None):
    return get_global_tree_root(tree_size)

@router.get('/global-tree/all-leaf-data', name="/global-tree/all-leaf-data", description=descriptions['global_tree_all_leaves'], responses={200: {'model': DTOAllLeavesGlobalTree}})
async def global_tree_all_leaves():
    return get_global_tree_all_leaves()

@router.get('/global-tree/all-roots', name="/global-tree/all-roots", description=descriptions['global_tree_all_roots'], responses={200: {'model': DTOAllRootsGlobalTree}})
async def global_tree_all_roots():
    return get_global_tree_all_roots()