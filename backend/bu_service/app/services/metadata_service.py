import base64
import logging

from app.adapter.tlmanager_adapter import *
from app.database.models.bu_model import MerkleTreeInfo, Metadata
from app.database.repositories.bu_repository import save, find_one
from app.services.tlmanager_service import insert_creating_tree_if_not_exists

METADATA_TREE_NAME_TEMPLATE = os.getenv('METADATA_TREE_NAME_TEMPLATE')
TREE_DEFAULT_COMMITMENT_SIZE = os.getenv('TREE_DEFAULT_COMMITMENT_SIZE')


def insert(file_content: bytes, filename: str, metadata_name: str, id_eleicao: int, zona: int, secao: int):
    logging.debug("Retrieving BU with election id %d zone %d and section %d", id_eleicao, zona, secao)
    bu = find_one(id_eleicao, zona, secao)

    if bu is None:
        raise Exception("BU not found")

    responses = {}
    for id_eleicao in bu.eleicoes:
        tree_name = METADATA_TREE_NAME_TEMPLATE.replace('${METADATA_NAME}', metadata_name).replace('${ELECTION_ID}',
                                                                                                   str(id_eleicao))
        logging.info(f"Inserting {filename} leaf for election {id_eleicao}")
        response = insert_creating_tree_if_not_exists(tree_name, base64.b64encode(file_content).decode('utf-8'))
        responses[str(id_eleicao)] = MerkleTreeInfo(
            tree_name=tree_name,
            index=response.json()['index'],
            hash=response.json()['value']
        )

    bu.metadata.append(Metadata(
        data_name=metadata_name,
        file_name=filename,
        data=file_content,
        merkletree_info=responses))

    logging.debug("Saving metadata to database")
    save(bu)

    return bu
