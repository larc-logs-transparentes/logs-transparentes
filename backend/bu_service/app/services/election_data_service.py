import base64
import logging
from typing import Optional, List

from app.config.environment import ELECTION_DATA_TREE_NAME_TEMPLATE, ELECTION_DATA_TREE_NAME_TEMPLATE_WITH_ELECTION
from app.database.models.bu_model import MerkleTreeInfo
from app.database.models.election_data_model import ElectionData
from app.database.repositories.election_data_repository import save
from app.services.tlmanager_service import insert_creating_tree_if_not_exists


def insert(file_content: bytes, filename: str, metadata_name: str, id_eleicao: List[int], zona: Optional[int] = None,
           secao: Optional[int] = None):
    responses = {}
    if id_eleicao is not None:
        for eleicao in id_eleicao:
            tree_name = ELECTION_DATA_TREE_NAME_TEMPLATE_WITH_ELECTION.replace('${ELECTION_DATA_NAME}',
                                                                               metadata_name).replace('${ELECTION_ID}',
                                                                                                      str(eleicao))
            response = insert_creating_tree_if_not_exists(tree_name, base64.b64encode(file_content).decode('utf-8'))
            responses[str(id_eleicao)] = MerkleTreeInfo(
                tree_name=tree_name,
                index=response.json()['index'],
                hash=response.json()['value']
            )
    else:
        tree_name = ELECTION_DATA_TREE_NAME_TEMPLATE.replace('${ELECTION_DATA_NAME}', metadata_name)
        response = insert_creating_tree_if_not_exists(tree_name, base64.b64encode(file_content).decode('utf-8'))
        responses = MerkleTreeInfo(
            tree_name=tree_name,
            index=response.json()['index'],
            hash=response.json()['value']
        )

    election_data = ElectionData(
        data_name=metadata_name,
        file_name=filename,
        data=file_content,
        merkletree_info=responses,
        eleicoes=id_eleicao,
        zona=zona,
        secao=secao
    )

    logging.debug("Saving election data to database")
    save(election_data)

    return election_data
