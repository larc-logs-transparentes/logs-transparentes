from pydantic import BaseModel

class TreeList(BaseModel):
    status: str
    trees: list

class BasicResponse(BaseModel):
    status: str
    message: str

class OnlyStatusResponse(BaseModel):
    status: str

class InsertLeafResponse(BaseModel):
    status: str
    value: str
    index: int
    message: str

class TreeMetadata(BaseModel):
    status: str
    algorithm: str
    encoding: str
    commitment_size: int | None
    length: int 
    buffer_length: int | None

class NodeHash(BaseModel):
    status: str
    value: str

class GlobalTreeData(BaseModel):
    value: str
    tree_name: str
    tree_size: int

class GlobalTreeLeaf(BaseModel):
    index: int
    value: GlobalTreeData

class AllLeavesGlobalTree(BaseModel):
    status: str
    leaves: list[GlobalTreeLeaf]