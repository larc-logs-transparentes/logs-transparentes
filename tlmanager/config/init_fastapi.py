from fastapi import FastAPI
from .init_database import mongodb_client, database

from services.keys import check_keys
from docs.descriptions.api_description import descriptions
import sys

app = FastAPI(
    title="TLManager",
    description=descriptions['API_description'],
    version="1.0",
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