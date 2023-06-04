from config.init_fastapi import app
from routers import tree, proofs
from controllers.tree import trees_list

app.include_router(tree.router, tags=["Tree management routes"])
app.include_router(proofs.router, tags=["Proofs routes"])

@app.get("/", tags=["Default route"])
async def root():
    return trees_list()