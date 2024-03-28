from pydantic import BaseModel

class Tree(BaseModel):
    tree_name: str
    commitment_size: int

class Leaf(BaseModel):
    tree_name: str
    data: bytes
    
class Commit(BaseModel):
    tree_name: str
