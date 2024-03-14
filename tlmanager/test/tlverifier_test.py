import requests
from tlverifier.merkle_functions.tl_functions import verify_data_entry
from pymerkle_logsTransparentes import MerkleTree

if __name__ == "__main__":
    URL_data = 'http://localhost:8080/bu/find_by_id?id=65afd915b74adbae8c3c6d91'
    bu_data = requests.get(URL_data).json()
    bu_inteiro = bu_data['bu_inteiro']
    merkletree_leaf_index = bu_data['merkletree_leaf_index']

    URL_data_proof = f'http://localhost:8080/tree/data-proof?tree_name=bu_tree_election_544&index=317'
    data_proof = requests.get(URL_data_proof).json()

    URL_trustable_root = 'http://localhost:8080/tree/tree-root?tree_name=global_tree'
    global_root = requests.get(URL_trustable_root).json()['value']

    result = verify_data_entry(data_proof, global_root, bu_inteiro)
    print(result)



