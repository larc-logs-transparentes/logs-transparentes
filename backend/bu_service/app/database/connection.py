from pymongo import MongoClient

connection = MongoClient('mongodb://localhost:27017/')  # externalizar


def get_db():
    return connection['bu_service']  # externalizar
