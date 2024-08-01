from app.database.connection import get_db
from app.database.models.election_data_model import ElectionData

db = get_db()


def save(data: ElectionData):
    db[data.data_name].insert_one(data.model_dump())
