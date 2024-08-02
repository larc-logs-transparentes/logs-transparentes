from fastapi import APIRouter
from controllers.public_key import *

router = APIRouter()

@router.get('/public_key', name="/public_key", description="Download public key")
async def public_key():
    return get_public_key()