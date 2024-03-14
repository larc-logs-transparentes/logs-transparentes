from pydantic import BaseModel
from typing import Optional


class BuModel(BaseModel):
    eleicoes: list[int]
    UF: str
    zona: int
    secao: int
    municipio: str
    bu_json: str
    bu: bytes
    merkletree_leaf_index: Optional[int]
    merkletree_leaf_hash: Optional[str]
