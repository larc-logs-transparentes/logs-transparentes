import base64
import logging

from app.database.models.election_data_model import ElectionData
from app.database.models.merkle_tree_info_model import MerkleTreeInfo
from app.database.repositories.election_data_repository import save
from app.services.tlmanager_service import insert_creating_tree_if_not_exists


def insert(file_content: bytes, filename: str, tree_name: str):
    response = insert_creating_tree_if_not_exists(tree_name, base64.b64encode(file_content).decode('utf-8'))

    election_data = ElectionData(
        file_name=filename,
        data=file_content,
        merkletree_info=MerkleTreeInfo(
            tree_name=tree_name,
            index=response.json()['index'],
            hash=response.json()['value'])
    )

    logging.debug("Saving election data to database")
    save(election_data)

    return election_data
