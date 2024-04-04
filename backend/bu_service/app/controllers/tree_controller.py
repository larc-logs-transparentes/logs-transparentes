from fastapi import APIRouter

from app.services import tree_service

router = APIRouter()


@router.post("/commit-all-trees")
async def commit_all_trees():
    return {
        "commited_trees": tree_service.commit_all_trees()
    }
