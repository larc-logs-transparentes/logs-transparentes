from pydantic import BaseModel

""" Response models """
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
    
class PymerkleMetadata(BaseModel):
    timestamp: int
    algorithm: str
    encoding: str
    security: bool
    
class PymerkleProof(BaseModel):
    metadata: PymerkleMetadata 
    offset: int
    path: list[list[int, str]]

class InclusionProofLocalTree(BaseModel):
    local_root: RootObject
    inclusion_proof: PymerkleProof
    
class ConsistencyProof(BaseModel):
    root: RootObject
    consistency_proof: PymerkleProof