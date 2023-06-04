from fastapi import APIRouter
from controllers.proofs import *

router = APIRouter()

""" Basic proofs """
@router.get('/inclusion-proof', name="/inclusion-proof", 
description="""
Get inclusion proof for a data or index in a tree.

### Example
```
localhost:8000/inclusion-proof?tree_name=my-tree&data=my-data
localhost:8000/inclusion-proof?tree_name=my-tree&index=0
```

### Response
```json
{
    "status": "ok",
    "proof": "..." // proof pymerkle object
} // if success

{
    "status": "error",
    "message": "Tree name not specified"
}

{
    "status": "error",
    "message": "Data or index not specified"
}

{
    "status": "error",
    "message": "Tree does not exist"
}

{
    "status": "error",
    "message": "Data not found in tree"
}

{
    "status": "error",
    "message": "Index out of range"
}
```
""")
async def inclusion_proof(tree_name: str, data: str|None = None, index: int|None = None):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data and index is None:
        return {'status': 'error', 'message': 'Data or index not specified'}
    return get_inclusion_proof(tree_name, data, index)

@router.get('/global-tree-consistency-proof', name="/global-tree-consistency-proof", 
description="""
Get global tree consistency proof between actual root and subroot with sublength.

### Example
```
localhost:8000/global-tree-consistency-proof?subroot=...&sublength=...
```

### Response
```json
{
    "status": "ok",
    "proof": "..." // proof pymerkle object
} // if success

{
    "status": "error",
    "message": "Subroot not specified"
}

{
    "status": "error",
    "message": "Sublength not specified"
}

{
    "status": "error",
    "message": "Subtree length out of range"
}

{
    "status": "error",
    "message": "Consistency proof for provided subroot was not found"
}
```
""")
async def global_tree_consistency_proof(subroot: str, sublength: int):
    if not subroot:
        return {'status': 'error', 'message': 'Subroot not specified'}
    elif sublength is None:
        return {'status': 'error', 'message': 'Sublength not specified'}
    return get_global_tree_consistency_proof(subroot, sublength)

""" High level proofs """
@router.get('/data-proof', name="/data-proof", 
description="""
Get all proofs needed to verify data in a tree.

- Inclusion proof for data/index in local tree
- Inclusion proof for local tree root in global tree

### Example
```
localhost:8000/data-proof?tree_name=my-tree&data=my-data
localhost:8000/data-proof?tree_name=my-tree&index=0
```

### Response
```json
{
    "status": "ok",
    "global_root": {
        "value": "...", // global tree root hash
        "tree_name": "global_tree",
        "tree_size": 5,
        "signature": "...",
        "timestamp": "..."
    }
    "local_tree": {
        "local_root": {
            "value": "...", // local tree root hash
            "tree_name": "my-tree",
            "tree_size": 5,
        }
        "inclusion_proof": "..." // proof pymerkle object for data/index in local tree
    },
    "data": {
        "inclusion_proof": "..." // proof pymerkle object for local tree root in global tree
    }
} // if success

{
    "status": "error",
    "message": "Tree name not specified"
}

{
    "status": "error",
    "message": "Data or index not specified"
}

{
    "status": "error",
    "message": "Tree does not exist"
}

{
    "status": "error",
    "message": "Data not found in tree"
}

{
    "status": "error",
    "message": "Index out of range"
}
```
""")
async def data_proof(tree_name: str, data: str|None = None, index: int|None = None):
    if not tree_name:
        return {'status': 'error', 'message': 'Tree name not specified'}
    elif not data and index is None:
        return {'status': 'error', 'message': 'Data or index not specified'}
    return get_data_proof(tree_name, data, index)

@router.get('/all-consistency-proof', name="/all-consistency-proof", 
description="""
Get all consistency proofs beetwen each root of a local tree committed on global tree.
If the tree is the global tree, it returns all consistency proofs beetwen each leaf inserted in the tree.

### Example
```
localhost:8000/all-consistency-proof?tree_name=my-tree
```

### Response
```json
{
    "status": "ok",
    "proofs": [
        {
            "root": {
                "value": "...", // tree root hash
                "tree_name": "my-tree",
                "tree_size": 5
            }
            "consistency_proof": "..." // proof pymerkle object beetwen this root and previous root
        },
        ...
    ]
} // if success

{
    "status": "error",
    "message": "Tree does not exist"
}

{
    "status": "error",
    "message": "Tree does not exist"
}

{
    "status": "error",
    "message": "No proofs found"
}
```
""")
async def all_consistency_proof(tree_name: str):
    return get_all_consistency_proof(tree_name)