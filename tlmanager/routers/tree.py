from fastapi import APIRouter
from controllers.tree import *
from pydantic import BaseModel 

router = APIRouter()

class Tree(BaseModel):
    tree_name: str
    commitment_size: int

@router.post('/tree-create', name="/tree-create", description="Create a new tree")
async def tree_create(tree: Tree):
    tree_name = tree.tree_name
    commitment_size = tree.commitment_size

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not commitment_size:
        return {'status': 'error', 'message': 'Commitment size not specified'}
    return create_tree(tree_name, commitment_size)


class Leaf(BaseModel):
    tree_name: str
    data: str
    
@router.post('/insert-leaf', name="/insert-leaf", description="Insert a new leaf in a tree")
async def tree_insert_leaf(leaf: Leaf):
    tree_name = leaf.tree_name
    data = leaf.data

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data:
        return {'status': 'error', 'message': 'Data not specified'}
    return insert_leaf(tree_name, data)


class Commit(BaseModel):
    tree_name: str

@router.post('/tree/commit', name="/tree/commit", description="Commit a tree")
async def tree_publish(commit: Commit):
    tree_name = commit.tree_name

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return commit_local_tree(tree_name)

@router.get('/tree', name="/tree", description="Get a tree informations")
async def tree(tree_name: str):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return get_tree(tree_name)

@router.get('/tree/root', name="/tree/root", description="Get a tree root")
async def tree_root(tree_name: str):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    return get_tree_root(tree_name)

@router.get('/leaf', name="/leaf", description="Get a leaf")
async def leaf(tree_name: str, index: int):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not index:
        return {'status': 'error', 'message': 'Index not specified'}
    return get_leaf(tree_name, index)

@router.get('/global-tree/all-leaf-data', name="/global-tree/all-leaf-data", description="Get all leaves data from global tree")
async def global_tree_all_leaves():
    return get_global_tree_all_leaves()