from typing import Optional
from pydantic import BaseModel


class MerkleTreeInfo(BaseModel):
    index: int
    hash: str


class BuModel(BaseModel):
    eleicoes: list[int]
    UF: str
    zona: int
    secao: int
    municipio: str
    bu_json: str
    bu: bytes
    merkletree_info: Optional[dict[str, MerkleTreeInfo]] = {}
