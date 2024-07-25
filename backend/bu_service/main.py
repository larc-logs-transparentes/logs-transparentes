from fastapi import FastAPI

from app.config.environment import *
from app.controllers import tree_controller, bu_controller, metadata_controller

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()
app.include_router(tree_controller.router, prefix="/tree", tags=["Tree management routes"])
app.include_router(bu_controller.router, prefix="/bu", tags=["BU management routes"])
app.include_router(metadata_controller.router, prefix="/bu/metadata",
                   tags=["Route to insert a metadata related to a BU"])


@app.get("/")
async def root():
    return {"message": "Serviço de inserção de BU executando"}
