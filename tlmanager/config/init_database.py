from pymongo import MongoClient

URL = "mongodb://localhost:27017"
COLLECTION = "tlmanager"

mongodb_client = MongoClient(URL)
database = mongodb_client[COLLECTION]