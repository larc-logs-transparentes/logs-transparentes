from fastapi import FastAPI
from .init_database import mongodb_client, database
from services.keys import check_keys

app = FastAPI() # to init: uvicorn main:app --reload

@app.on_event("startup")
async def startup_event():
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