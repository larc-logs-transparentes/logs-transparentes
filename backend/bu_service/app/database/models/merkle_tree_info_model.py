from pydantic import BaseModel


class MerkleTreeInfo(BaseModel):
    tree_name: str
    index: int
    hash: str
