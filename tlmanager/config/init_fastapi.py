from fastapi import FastAPI
from .init_database import mongodb_client, database

from services.keys import check_keys
import sys

description = """
An API to manage multiple Merkle Trees and their proofs.

## Trees
This system works with a Global Tree and multiple Local Trees. The Global Tree is a Merkle Tree that contains the root of all Local Trees. 

Each Local Tree has a commitment size, which is the number of leaves that can be inserted in a "pending" state before the tree is committed to the Global Tree, and the leaves are actually inserted in the tree.

When a Local Tree is committed to the Global Tree, the root of the Local Tree is inserted as a leaf in the Global Tree, a consistency proof is generated for the Local and Global tree, and the Global root is signed and stored in the database.

## Proofs

### High level proofs

**Data proof**: a proof that a data is in a Local Tree, and that the Local Tree is in the Global Tree.

**All consistency proof**: the consistency proof of the Local Tree between each commitment.
"""

app = FastAPI(
    title="TLManager",
    description=description,
    version=1.0,
) # to init: uvicorn main:app --reload

@app.on_event("startup")
async def startup_event():
    if sys.version_info[0:2] < (3, 9):
        raise Exception('Python version must be 3.9 or higher')
    if database is None:
        raise Exception('Database not initialized')
    if check_keys() is False:
        raise Exception('Keys not initialized')
    app.mongodb_client = mongodb_client
    app.database = database
    print('Connected to MongoDB')

@app.on_event("shutdown")
async def shutdown_event():
    app.mongodb_client.close()
    print('Disconnected from MongoDB')