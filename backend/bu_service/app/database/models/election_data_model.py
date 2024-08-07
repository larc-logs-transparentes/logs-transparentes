from pydantic import BaseModel

from app.database.models.bu_model import MerkleTreeInfo


class ElectionData(BaseModel):
    file_name: str
    data: bytes
    merkletree_info: MerkleTreeInfo
