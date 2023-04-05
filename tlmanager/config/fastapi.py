from fastapi import FastAPI, Request
from pymongo import MongoClient

app = FastAPI() # to init: uvicorn main:app --reload
database = MongoClient("mongodb://localhost:27017")["tlmanager"]

@app.on_event("startup")
async def startup_event():
    app.mongodb_client = MongoClient("mongodb://localhost:27017")
    app.database = app.mongodb_client["tlmanager"]
    print('Connected to MongoDB')

@app.on_event("shutdown")
async def shutdown_event():
    app.mongodb_client.close()
    print('Disconnected from MongoDB')
