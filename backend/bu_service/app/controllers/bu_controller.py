import logging

from fastapi import APIRouter, UploadFile, File

from app.services import bu_service

router = APIRouter()


@router.post("/create")
async def create(file: UploadFile = File(...)):
    file_name = file.filename
    file_content = await file.read()

    logging.info(f"Received file {file_name}")
    bu_parsed = bu_service.insert(file_content, file_name)
    return {"status": "ok", "bu": bu_parsed.dict(exclude={"bu"})}
