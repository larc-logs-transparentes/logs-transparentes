from pydantic import BaseModel

class PymerkleMetadata(BaseModel):
    timestamp: int
    algorithm: str
    encoding: str
    security: bool

class PymerkleProof(BaseModel):
    metadata: PymerkleMetadata 
    offset: int
    path: list[list[int, str]]

class BasicProof(BaseModel):
    status: str
    proof: PymerkleProof

class RootObject(BaseModel):
    value: str
    tree_name: str
    tree_size: int

class GlobalTreeRootObject(RootObject):
    signature: str
    timestamp: int

class InclusionProofLocalTree(BaseModel):
    local_root: RootObject
    inclusion_proof: PymerkleProof

class DataProof(BaseModel):
    status: str
    global_root: GlobalTreeRootObject
    local_tree: InclusionProofLocalTree

class ConsistencyProof(BaseModel):
    root: RootObject
    consistency_proof: PymerkleProof

class AllConsistencyProof(BaseModel):
    status: str
    proofs: list[ConsistencyProof]