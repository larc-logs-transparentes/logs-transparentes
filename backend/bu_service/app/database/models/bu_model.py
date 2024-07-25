from typing import Optional

from pydantic import BaseModel


class MerkleTreeInfo(BaseModel):
    tree_name: str
    index: int
    hash: str


class Metadata(BaseModel):
    data_name: str
    file_name: str
    data: bytes
    merkletree_info: Optional[dict[str, MerkleTreeInfo]] = {}


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
    metadata: list[Metadata] = []
