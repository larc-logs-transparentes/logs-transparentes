import os

import dotenv
from pymongo import MongoClient
from pydantic_settings import BaseSettings

dotenv.load_dotenv()


class Settings(BaseSettings):
    RESET: bool = False


settings = Settings()

connection = MongoClient(os.getenv('MONGO_URL'))
if settings.RESET:
    connection.drop_database('bu_service')
    print('Database reseted')


def get_db():
    return connection['bu_service']
