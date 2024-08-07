import logging

from fastapi import APIRouter, UploadFile, File, Form

from app.services import election_data_service

router = APIRouter()


@router.post("/create")
async def create(
        tree_name: str = Form(...),
        file: UploadFile = File(...)
):
    file_name = file.filename
    file_content = await file.read()

    logging.info(f"Received file {file_name} to insert in tree {tree_name}")

    try:
        election_data = election_data_service.insert(file_content, file_name, tree_name)
    except Exception as e:
        logging.error(e)
        return {"status": "error", "message": str(e)}

    return {"status": "ok", "bu": election_data.dict(exclude={"data"})}
