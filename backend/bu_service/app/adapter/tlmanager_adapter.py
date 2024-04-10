import requests
import os
import dotenv

dotenv.load_dotenv()

TL_MANAGER_URL = os.getenv('TL_MANAGER_URL')

def get_trees():
    return requests.get(f'{TL_MANAGER_URL}/').json()


def create_tree(tree_name, commitment_size):
    requests.post(f'{TL_MANAGER_URL}/tree-create', json={"tree_name": tree_name, "commitment_size": commitment_size})


def commit_tree(tree_name):
    return requests.post(f'{TL_MANAGER_URL}/tree/commit', json={"tree_name": tree_name})


def insert_leaf(tree_name, data):
    return requests.post(f'{TL_MANAGER_URL}/insert-leaf', json={"tree_name": tree_name, "data": data})


def get_data_proof(tree_name, index):
    return requests.get(f'{TL_MANAGER_URL}/data-proof?tree_name={tree_name}&index={index}').json()


def get_trustable_global_tree_root():
    return requests.get(f'{TL_MANAGER_URL}/tree/root?tree_name=global_tree').json()


def get_all_leaf_data_global_tree():
    return requests.get(f'{TL_MANAGER_URL}/global-tree/all-leaf-data').json()


def get_all_consistency_proof(tree_name):
    return requests.get(f'{TL_MANAGER_URL}/all-consistency-proof?tree_name={tree_name}').json()
