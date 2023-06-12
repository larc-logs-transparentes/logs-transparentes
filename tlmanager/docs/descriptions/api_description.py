API_DESCRIPTION = """
An API to manage multiple Merkle Trees and their proofs.

## Trees
This system works with a Global Tree and multiple Local Trees. The Global Tree is a Merkle Tree that contains the roots of all Local Trees, that store the data.

Each Local Tree has a commitment size, which is the number of leaves that can be inserted in a "pending" state before the tree is committed to the Global Tree, and the leaves are actually inserted in the tree.

When a Local Tree is committed to the Global Tree, the root of the Local Tree is inserted as a leaf in the Global Tree, a consistency proof is generated for the Local and Global tree, and the Global root is signed and stored in the database.

## Proofs

### High level proofs

**Data proof**: a proof that a data is in a Local Tree, and that the Local Tree is in the Global Tree.

**All consistency proof**: the consistency proof of the Local Tree between each commitment.
"""

descriptions = { 'API_description': API_DESCRIPTION }