from app.database.connection import get_db
from app.database.models.bu_model import BuModel

collection = get_db()["bu"]


def save(bu: BuModel):
    collection.insert_one(bu.dict())
