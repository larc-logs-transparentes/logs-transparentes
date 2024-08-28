import logging

from app.adapter.tlmanager_adapter import *

TREE_DEFAULT_COMMITMENT_SIZE = os.getenv('TREE_DEFAULT_COMMITMENT_SIZE')


def insert_creating_tree_if_not_exists(tree_name, data, commitment_size=TREE_DEFAULT_COMMITMENT_SIZE):
    insert_leaf_response = insert_leaf(tree_name, data)
    logging.info(insert_leaf_response.json())
    if insert_leaf_response.status_code != 200 and insert_leaf_response.json().get('message') == "Tree does not exist":
        logging.info(f"Creating tree with name {tree_name}")
        create_tree(tree_name, commitment_size)

        logging.info(f"Trying to insert leaf for tree {tree_name} again")
        insert_leaf_response = insert_leaf(tree_name, data)
        logging.info(insert_leaf_response.json())

        if insert_leaf_response.status_code != 200:
            raise Exception("Failed to insert leaf")

    return insert_leaf_response
