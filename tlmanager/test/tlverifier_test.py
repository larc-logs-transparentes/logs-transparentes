import requests
from tlverifier.merkle_functions.tl_functions import verify_single_data
from pymerkle_logsTransparentes import MerkleTree

if __name__ == "__main__":
    URL_data = 'http://localhost:8080/bu/1'
    bu_data = requests.get(URL_data).json()
    bu_inteiro = bu_data['bu_inteiro']
    merkletree_leaf_index = bu_data['merkletree_leaf_index']

    URL_data_proof = f'http://localhost:8080/tree/data-proof?tree-name=bu_tree&index={merkletree_leaf_index}'
    data_proof = requests.get(URL_data_proof).json()

    URL_trustable_root = 'http://localhost:8080/tree/tree-root?tree-name=global_tree'
    global_root = requests.get(URL_trustable_root).json()['value']

    result = verify_single_data(data_proof, global_root, bu_inteiro)
    print(result)



