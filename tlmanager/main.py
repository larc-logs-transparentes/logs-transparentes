from config.init_fastapi import app
from routers import tree, proofs
from controllers.tree import trees_list

app.include_router(tree.router)
app.include_router(proofs.router)

@app.get("/")
async def root():
    return trees_list()