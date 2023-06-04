TREE_CREATE_DESCRIPTION = """
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
All pending leaves are inserted in the tree and the tree is inserted in the global tree.

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
Get the metadata of a tree with name 'tree_name'.

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
Get the leaf hash with index 'index' from tree with name 'tree_name'.

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

TREE_ALL_LEAF_DATA_DESCRIPTION = """
Get all leaves from the global tree ordered by index.

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

descriptions = {
    'tree_create': TREE_CREATE_DESCRIPTION,
    'insert_leaf': INSERT_LEAF_DESCRIPTION,
    'tree_commit': TREE_COMMIT_DESCRIPTION,
    'tree_metadata': TREE_METADATA_DESCRIPTION,
    'tree_root': TREE_ROOT_DESCRIPTION,
    'tree_leaf': TREE_LEAF_DESCRIPTION,
    'global_tree_all_leaves': TREE_ALL_LEAF_DATA_DESCRIPTION
}