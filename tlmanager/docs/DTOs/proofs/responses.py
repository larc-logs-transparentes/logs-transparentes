from pydantic import BaseModel

from docs.DTOs.common.responses import RootObject, GlobalTreeRootObject

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