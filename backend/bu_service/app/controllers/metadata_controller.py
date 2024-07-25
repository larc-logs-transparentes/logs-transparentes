import logging

from fastapi import APIRouter, UploadFile, File, Form

from app.services import metadata_service

router = APIRouter()


@router.post("/create")
async def create(
        metadata_name: str = Form(...),
        id_eleicao: int = Form(...),
        zona: int = Form(...),
        secao: int = Form(...),
        file: UploadFile = File(...)
):
    file_name = file.filename
    file_content = await file.read()

    logging.info(f"Received file {file_name}")

    try:
        bu = metadata_service.insert(file_content, file_name, metadata_name, id_eleicao, zona, secao)
    except Exception as e:
        logging.error(e)
        return {"status": "error", "message": str(e)}

    for metadata in bu.metadata:
        del metadata.data

    return {"status": "ok", "bu": bu.dict(exclude={"bu"})}
