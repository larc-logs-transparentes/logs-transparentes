from config.init_fastapi import app
from routers import tree, proofs
from controllers.tree import trees_list
from docs.DTOs.responses import TreeList, BasicResponse

app.include_router(tree.router, tags=["Tree management routes"], responses={400: {'model': BasicResponse}})
app.include_router(proofs.router, tags=["Proofs routes"], responses={400: {'model': BasicResponse}})

@app.get("/", tags=["Default route"], response_model=TreeList)
async def root():
    return trees_list()