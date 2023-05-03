from pymongo import MongoClient, errors as pymongo_errors
from gridfs import GridFS, errors as gridfs_errors

from pydantic import BaseSettings

class Settings(BaseSettings):
    RESET: bool = False

settings = Settings()

URL = "mongodb://localhost:27017"
COLLECTION = "tlmanager"

mongodb_client = MongoClient(URL)
database = mongodb_client[COLLECTION]
database.fs = GridFS(database)

if settings.RESET:
    database['state'].drop()
    database['fs.chunks'].drop()
    database['fs.files'].drop()
    database['global_tree_roots'].drop()
    database['global_tree_leaves'].drop()
    database['consistency_proofs'].drop()
    print('Database reseted')