from docs.models.responses import GlobalTreeLeaf, NodeObject, OnlyStatusResponse, BasicResponse, GlobalTreeRootObject

""" /tree-create """
class DTOTreeCreate(BasicResponse):
    pass

""" /insert-leaf """
class DTOInsertLeaf(BasicResponse):
    value: str
    index: int
    
""" /tree/commit """
class DTOCommit(OnlyStatusResponse):
    pass

""" /tree """
class DTOTreeMetadata(OnlyStatusResponse):
    algorithm: str
    encoding: str
    commitment_size: int | None
    length: int 
    buffer_length: int | None

""" /tree/root """
""" /leaf """
class DTONodeHash(OnlyStatusResponse, NodeObject):
    pass

""" /global-tree/root """
class DTOGlobalTreeRoot(OnlyStatusResponse):
    root: GlobalTreeRootObject
    
""" /global-tree/all-leaf-data """
class DTOAllLeavesGlobalTree(OnlyStatusResponse):
    leaves: list[GlobalTreeLeaf]
    
""" /global-tree/all-roots """
class DTOAllRootsGlobalTree(OnlyStatusResponse):
    roots: list[GlobalTreeRootObject]

""" / """    
class TreeList(OnlyStatusResponse):
    trees: list[str]