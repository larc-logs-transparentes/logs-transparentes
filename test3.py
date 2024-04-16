import base64
import requests
from tlverifier import verify_data_entry

BU_ID = '6617d4e889f2d11999da3c6e'

ELECTORAL_AUTHORITY_URL = 'http://localhost:8080'
MONITOR_URL = 'http://localhost:8080'

if __name__ == '__main__':

    # getting the BU metadata from Electoral Authority
    bu = requests.get(f'{ELECTORAL_AUTHORITY_URL}/bu/find_by_id?id={BU_ID}').json()

    for key in bu['merkletree_info']:  # each election tree
        merkletree_info = bu['merkletree_info'][key]
        tree_name = merkletree_info['tree_name']
        index = merkletree_info['index']
        hash = merkletree_info['hash']

        # getting proof
        proof = requests.get(f'{ELECTORAL_AUTHORITY_URL}/tree/data-proof?tree_name={tree_name}&index={index}').json()

        # getting trusted root
        trusted_root = requests.get(f'{MONITOR_URL}/tree/tree-root?tree_name=global_tree').json()['value']

        # verifying proof
        result = verify_data_entry(proof, trusted_root, base64.b64decode(bu['bu']))

        print(result)
