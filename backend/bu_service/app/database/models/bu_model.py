from typing import Optional

from pydantic import BaseModel

from app.database.models.merkle_tree_info_model import MerkleTreeInfo


class BuModel(BaseModel):
    eleicoes: list[int]
    filename: str
    UF: str
    zona: int
    secao: int
    municipio: str
    bu_json: str
    bu: bytes
    merkletree_info: Optional[dict[str, MerkleTreeInfo]] = {}
