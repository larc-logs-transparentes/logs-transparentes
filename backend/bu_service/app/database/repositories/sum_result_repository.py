from app.database.connection import get_db
from app.database.models.sum_result_model import SumResultModel
import pymongo

collection = get_db()["sum_results"]


# collection.create_index([('identifer', pymongo.DESCENDING)], unique=True)

def update_or_insert(result: SumResultModel):
    collection.update_one({"identifier": result.identifier}, {"$set": result.model_dump()}, upsert=True)

def save(result: SumResultModel):
    collection.insert_one(result.model_dump())

def delete(result: SumResultModel):
    collection.delete_one({"identifier": result.identifier})
