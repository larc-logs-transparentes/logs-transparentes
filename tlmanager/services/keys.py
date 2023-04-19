from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization
import os

PATH_KEYS = "keys/"

#verify if the keys exist
def check_keys():
    if not os.path.exists(PATH_KEYS):
        return False
    if not os.path.exists(PATH_KEYS + "private_key.pem"):
        return False
    if not os.path.exists(PATH_KEYS + "public_key.pem"):
        return False
    return True

def sign_root(root):
    return Ed25519PrivateKey.from_private_bytes(get_private_key_bytes()).sign(root).hex()

def get_private_key_bytes():
    with open(PATH_KEYS + "private_key.pem", "rb") as f:
        return f.read()[:32]