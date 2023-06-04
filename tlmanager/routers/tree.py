from fastapi import APIRouter
from controllers.tree import *
from routers.models.tree import Tree, Leaf, Commit

router = APIRouter()

#TODO: error handling, descriptions in other file

@router.post('/tree-create', name="/tree-create", 
description="""
Create a new tree with a name key and a commitment size.

### Example
```json
{
    "tree_name": "my-tree",
    "commitment_size": 10
}
```

### Response
```json
{ 
    status: "ok", 
    message: "Tree created" 
} // if success

{
    status: "error",
    message: "Tree name not specified"
} // if tree_name is not specified

{
    status: "error",
    message: "Commitment size not specified"
} // if commitment_size is not specified

{
    status: "error",
    message: "Tree already exists"
} // if tree already exists
```
""")
async def tree_create(tree: Tree):
    tree_name = tree.tree_name
    commitment_size = tree.commitment_size

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not commitment_size:
        return {'status': 'error', 'message': 'Commitment size not specified'}
    return create_tree(tree_name, commitment_size)


@router.post('/insert-leaf', name="/insert-leaf", 
description="""
Insert a new leaf in a tree with name 'tree_name' with content 'data'.

### Example
```json
{
    "tree_name": "my-tree",
    "data": "my-data"
}
```

### Response
```json
{
    status: "ok",
    value: "...", // hash of the leaf
    index: 0, // index of the leaf
    message: "Pending" | "Commited"
} // if success

{
    status: "error",
    message: "Tree name not specified"
} // if tree_name is not specified

{
    status: "error",    
    message: "Data not specified"
} // if data is not specified

{
    status: "error",
    message: "Tree does not exist"
} // if tree does not exist
```
""")
async def tree_insert_leaf(leaf: Leaf):
    tree_name = leaf.tree_name
    data = leaf.data

    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data:
        return {'status': 'error', 'message': 'Data not specified'}
    return insert_leaf(tree_name, data)

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