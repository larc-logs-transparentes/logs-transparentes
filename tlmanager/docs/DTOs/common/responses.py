from pydantic import BaseModel

class OnlyStatusResponse(BaseModel):
    status: str

class BasicResponse(OnlyStatusResponse):
    message: str
    
class NodeObject(BaseModel):
    value: str
    
class RootObject(NodeObject):
    tree_name: str
    tree_size: int

class GlobalTreeRootObject(RootObject):
    signature: str
    timestamp: int

class GlobalTreeLeaf(BaseModel):
    index: int
    value: RootObject