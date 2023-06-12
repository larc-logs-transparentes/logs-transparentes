API_DESCRIPTION = """

An API to manage multiple Merkle Trees and their proofs.

### Trees
This system works with a Global Tree and multiple Local Trees. 
The Global Tree contains all roots of Local Trees, while Local Trees store the data.

Each Local Tree has a commitment size, which is the number of leaves that can be inserted in a "pending" state.
Only after enough "pending" leaves, they are actually inserted on the Local Tree. 
Then, the new tree root is commited on the Global Tree.
If necessary, Local Trees can be manually committed, even if they not have enough "pending" leaves.

Each time a Local Tree is commited, a new Global root is generated, signed, and stored. 
Then, two consistency proofs are generated and stored: 1) for the new Global root; 2) for the new Local Tree root.

### Proofs

TLmanager provides basically two types of proofs

**Data proof**: a proof that a data is included on the system. 
This contains the inclusion proof of the data on a local tree, and the inclusion proof of the local root on a global tree.


**All consistency proof**: A list of all consistency proof for a given tree, saved on each commitment.

"""

descriptions = { 'API_description': API_DESCRIPTION }