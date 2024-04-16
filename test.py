
import base64
import requests
from pymerkle_logsTransparentes import MerkleTree

URL_DOWNLOAD_BU = 'http://localhost:8080/bu/download?id=6617d4e889f2d11999da3c6e'
URL_TO_GET_BU = 'http://localhost:8080/bu/find_by_id?id=6617d4e889f2d11999da3c6e'

if __name__ == '__main__':
    file = requests.get(URL_DOWNLOAD_BU)
    bu = requests.get(URL_TO_GET_BU).json()

    # Get hash from tree leaf
    bu_hash = bytes(bu['merkletree_info']['545']['hash'], 'utf-8')

    # Calculating hash from file
    encoded_str = base64.b64encode(file.content).decode('utf-8')
    file_hash_hex = MerkleTree().hash_entry(base64.b64decode(encoded_str))

    if file_hash_hex == bu_hash:
        print('The hash is correct')
    else:
        print('The hash is incorrect')

