from pymongo import MongoClient, errors as pymongo_errors
from gridfs import GridFS, errors as gridfs_errors

from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    RESET: bool = False

settings = Settings()

URL:str = os.environ.get(key= "URL", default="mongodb://localhost:27017")
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