from fastapi import APIRouter, UploadFile, File
from typing import Annotated

from app.services import bu_service

router = APIRouter()


@router.post("/create")
async def create(file: UploadFile = File(...)):
    print(file)
    file_content = await file.read()
    bu_service.insert(file_content)
    return {"status": "ok"}
