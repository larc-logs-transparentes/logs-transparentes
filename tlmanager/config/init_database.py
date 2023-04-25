from pymongo import MongoClient
from pydantic import BaseSettings

class Settings(BaseSettings):
    RESET: bool = False

settings = Settings()

URL = "mongodb://localhost:27017"
COLLECTION = "tlmanager"

mongodb_client = MongoClient(URL)
database = mongodb_client[COLLECTION]

if settings.RESET:
    database['state'].drop()
    database['global_tree_roots'].drop()
    database['global_tree_leaves'].drop()
    database['consistency_proofs'].drop()
    print('Database reseted')