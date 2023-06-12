from docs.DTOs.common.responses import OnlyStatusResponse, PymerkleProof, GlobalTreeRootObject, InclusionProofLocalTree, ConsistencyProof

""" /inclusion-proof """
""" /global-tree-consistency-proof """
class DTOPymerkleProof(OnlyStatusResponse):
    proof: PymerkleProof
    
""" /data-proof """
class DTODataProof(OnlyStatusResponse):
    global_root: GlobalTreeRootObject
    local_tree: InclusionProofLocalTree

""" /all-consistency-proof """
class DTOAllConsistencyProof(OnlyStatusResponse):
    proofs: list[ConsistencyProof]