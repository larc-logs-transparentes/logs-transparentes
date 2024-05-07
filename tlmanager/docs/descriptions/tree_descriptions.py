TREE_CREATE_DESCRIPTION = """
Create a new local tree

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
    "status": "ok", 
    "message": "Tree created" 
} // if success

{
    "status": "error",
    "message": "Tree name not specified"
} 

{
    "status": "error",
    "message": "Commitment size not specified"
}

{
    "status": "error",
    "message": "Tree already exists"
} 
```
"""

INSERT_LEAF_DESCRIPTION = """
Insert a base64 encoded data as a new leaf in a local tree.
This data will be decoded and hashed using the tree's hash algorithm.

### Example
```json
{
    "tree_name": "my-tree",
    "data": "bXktZGF0YQ=="
}
```

### Response
```json
{
    "status": "ok",
    "value": "...", // hash of the leaf
    "index": 0, // index of the leaf
    "message": "Pending" | "Commited"
} // if success

{
    "status": "error",
    "message": "Tree name not specified"
} 

{
    "status": "error",    
    "message": "Data not specified"
} 

{
    "status": "error",
    "message": "Tree does not exist"
} 
```
"""

TREE_COMMIT_DESCRIPTION = """
All pending leaves are inserted in the tree, and the tree root is inserted in the global tree.

### Example
```json
{
    "tree_name": "my-tree"
}
```
### Response
```json
{
    "status": "ok"
} // if success

{
    "status": "error",
    "message": "Tree name not specified"
}

{
    "status": "error",
    "message": "Tree does not exist"
} 

{
    "status": "error",
    "message": "Tree does not have entries to commit"
} // if tree does not have pending leaves
```
"""

TREE_METADATA_DESCRIPTION = """
Get the metadata of a given tree.

### Example
```
localhost:8000/tree?tree_name=my-tree
```

### Response
```json
{
    "status": "ok",
    "algorithm": "sha256", // hash algorithm
    "encoding": "utf-8", // encoding used to convert data to bytes
    "security": true, // if the bit security is enabled
    "commitment_size": 10, // number of leaves to commit
    "length": 0, // number of leaves
    "buffer_length": 0 // number of pending leaves
} // if success

{
    "status": "error",
    "message": "Tree name not specified"
}

{
    "status": "error",
    "message": "Tree does not exist"
}
```
"""

TREE_ROOT_DESCRIPTION = """
Get the root of a tree in hexadecimal format.

### Example
```
localhost:8000/tree/root?tree_name=my-tree
```

### Response
```json
{
    "status": "ok",
    "value": "..."
} // if success

{
    "status": "error",
    "message": "Tree name not specified"
}

{
    "status": "error",
    "message": "Tree does not exist"
}
```
"""

TREE_LEAF_DESCRIPTION = """
Get a leaf value (hash) from a tree

### Example
```
localhost:8000/leaf?tree_name=my-tree&index=0
```

### Response
```json
{
    "status": "ok",
    "value": "..."
} // if success

{
    "status": "error",
    "message": "Tree name not specified"
}

{
    "status": "error",
    "message": "Index not specified"
}

{
    "status": "error",
    "message": "Tree does not exist"
}

{
    "status": "error",
    "message": "Leaf index out of range"
} // if index > tree length
```
"""

TREE_GLOBAL_ROOT_DESCRIPTION = """
Get the signed global root. You can get past global roots by specifying tree_size. 

### Example
```
localhost:8000/global-tree/root
localhost:8000/global-tree/root?tree_size=10
```

### Response
```json
{
    "status": "ok",
    "root": {
        "value": "...", // root hash
        "tree_name": "global-tree",
        "tree_size": 10
        "signature": "..." // signature of the root
        "timestamp": "..." // timestamp of the root
    }
} // if success

{
    "status": "error",
    "message": "Tree size out of range"
} // if tree_size > global tree length

{
    "status": "error",
    "message": "Global tree is empty"
} // if no local tree is commited yet
```

"""

TREE_ALL_LEAF_DATA_DESCRIPTION = """
Get all leaves from the global tree, ordered by index.

### Example
```
localhost:8000/global-tree/all-leaf-data
```

### Response
```json
{
    "status": "ok",
    "leaves": [
        {
            "index": 0,
            "value": {
                "value": "...", // leaf hash
                "tree_name": "my-tree",
                "size": 10, 
            }
        },
        ...
    ]
}
```
"""

TREE_ALL_ROOT_GLOBAL_TREE_DESCRIPTION = """
Get the history of all the roots of the global tree, sorted by tree size.
If an initial root value is specified, the roots will be returned starting from the root with the specified value.

### Example
```
localhost:8000/global-tree/all-roots
localhost:8000/global-tree/all-roots?initial_root_value=c0cd15d758e87172bee43b4706bbf80dc364084216a9bccfea92b9cc00543d35
```

### Response
```json
{
    "status": "ok",
    "roots": [
        {
           "value": "...", // root hash
            "tree_name": "global-tree",
            "tree_size": 10
            "signature": "..." // signature of the root
            "timestamp": "..." // timestamp of the root
        }, 
        ...
    ]
} // if success

{
    "status": "error",
    "message": "No roots found"
} // if no roots are found
```
"""

descriptions = {
    'tree_create': TREE_CREATE_DESCRIPTION,
    'insert_leaf': INSERT_LEAF_DESCRIPTION,
    'tree_commit': TREE_COMMIT_DESCRIPTION,
    'tree_metadata': TREE_METADATA_DESCRIPTION,
    'tree_root': TREE_ROOT_DESCRIPTION,
    'tree_leaf': TREE_LEAF_DESCRIPTION,
    'global_tree_root': TREE_GLOBAL_ROOT_DESCRIPTION,
    'global_tree_all_leaves': TREE_ALL_LEAF_DATA_DESCRIPTION,
    'global_tree_all_roots': TREE_ALL_ROOT_GLOBAL_TREE_DESCRIPTION
}