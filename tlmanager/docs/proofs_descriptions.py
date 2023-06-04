INCLUSION_PROOF_DESCRIPTION = """
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
"""

GLOBAL_TREE_CONSISTENCY_PROOF_DESCRIPTION = """
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
"""

DATA_PROOF_DESCRIPTION = """
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
"""

ALL_CONSISTENCY_PROOF_DESCRIPTION = """
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
"""

descriptions =  {
    'inclusion_proof': INCLUSION_PROOF_DESCRIPTION,
    'global_tree_consistency_proof': GLOBAL_TREE_CONSISTENCY_PROOF_DESCRIPTION,
    'data_proof': DATA_PROOF_DESCRIPTION,
    'all_consistency_proof': ALL_CONSISTENCY_PROOF_DESCRIPTION
}