from typing import Optional, Dict, Union

from pydantic import BaseModel

from app.database.models.bu_model import MerkleTreeInfo


class ElectionData(BaseModel):
    data_name: str
    file_name: str
    data: bytes
    merkletree_info: Union[Dict[str, MerkleTreeInfo], MerkleTreeInfo] = None
    zona: Optional[int] = None
    secao: Optional[int] = None
    eleicoes: Optional[list[int]] = None
