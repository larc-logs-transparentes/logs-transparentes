from fastapi import FastAPI, Request
from .init_database import mongodb_client, database

app = FastAPI() # to init: uvicorn main:app --reload

@app.on_event("startup")
async def startup_event():
    if database is None:
        raise Exception('Database not initialized')
    app.mongodb_client = mongodb_client
    app.database = database
    print('Connected to MongoDB')

@app.on_event("shutdown")
async def shutdown_event():
    app.mongodb_client.close()
    print('Disconnected from MongoDB')