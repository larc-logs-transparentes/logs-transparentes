from app.database.connection import get_db
from app.database.models.bu_model import BuModel

collection = get_db()["bus"]


def find_one(election_id: int, zone: int, section: int):
    data = collection.find_one({"eleicoes": election_id, "zona": zone, "secao": section})
    if data is None:
        return None
    return BuModel(**data)


def save(bu: BuModel):
    collection.update_one(
        {"eleicoes": bu.eleicoes, "zona": bu.zona, "secao": bu.secao},
        {"$set": bu.model_dump()},
        upsert=True
    )
