from fastapi import APIRouter
from controllers.tree import *
from routers.models.tree import Tree, Leaf, Commit
from docs.tree_descriptions import descriptions

router = APIRouter()

#TODO: error handling, descriptions in other file

@router.post('/tree-create', name="/tree-create", description=descriptions['tree_create'])
async def tree_create(tree: Tree):
    tree_name = tree.tree_name
    commitment_size = tree.commitment_size

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not commitment_size:
        return {'status': 'error', 'message': 'Commitment size not specified'}
    return create_tree(tree_name, commitment_size)


@router.post('/insert-leaf', name="/insert-leaf", description=descriptions['insert_leaf'])
async def tree_insert_leaf(leaf: Leaf):
    tree_name = leaf.tree_name
    data = leaf.data

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data:
        return {'status': 'error', 'message': 'Data not specified'}
    return insert_leaf(tree_name, data)

@router.post('/tree/commit', name="/tree/commit", description=descriptions['tree_commit'])
async def tree_publish(commit: Commit):
    tree_name = commit.tree_name

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return commit_local_tree(tree_name)


@router.get('/tree', name="/tree", description=descriptions['tree_metadata'])
async def tree(tree_name: str):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return get_tree(tree_name)

@router.get('/tree/root', name="/tree/root", description=descriptions['tree_root'])
async def tree_root(tree_name: str):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return get_tree_root(tree_name)

@router.get('/leaf', name="/leaf", description=descriptions['tree_leaf'])
async def leaf(tree_name: str, index: int):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not index:
        return {'status': 'error', 'message': 'Index not specified'}
    return get_leaf(tree_name, index)

@router.get('/global-tree/all-leaf-data', name="/global-tree/all-leaf-data", description=descriptions['global_tree_all_leaves'])
async def global_tree_all_leaves():
    return get_global_tree_all_leaves()