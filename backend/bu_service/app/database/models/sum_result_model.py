
from pydantic import BaseModel
from typing import Optional
class SumResultModel(BaseModel):
    result: str
    identifier: str
    id_eleicao: int
    estado: str
    cargo: str
    municipio: Optional[str] = None
    municipio_code: Optional[int] = None