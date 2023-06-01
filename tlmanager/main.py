from config.init_fastapi import app
from routers import tree, proofs
from controllers.tree import trees_list

app.include_router(tree.router, tags=["Tree management"])
app.include_router(proofs.router, tags=["Proofs"])

@app.get("/", tags=["Default"])
async def root():
    return trees_list()