import logging
from typing import List

from fastapi import APIRouter, UploadFile, File, Form

from app.services import election_data_service

router = APIRouter()


@router.post("/create")
async def create(
        metadata_name: str = Form(...),
        id_eleicao: List[int] = Form(None),
        zona: int = Form(None),
        secao: int = Form(None),
        file: UploadFile = File(...)
):
    file_name = file.filename
    file_content = await file.read()

    logging.info(f"Received file {file_name}")
    if id_eleicao is not None or zona is not None or secao is not None:
        logging.info(f"Received optional parameters: id_eleicao={id_eleicao}, zona={zona}, secao={secao}")

    try:
        election_data = election_data_service.insert(file_content, file_name, metadata_name, id_eleicao, zona, secao)
    except Exception as e:
        logging.error(e)
        return {"status": "error", "message": str(e)}

    return {"status": "ok", "bu": election_data.dict(exclude={"data"})}
