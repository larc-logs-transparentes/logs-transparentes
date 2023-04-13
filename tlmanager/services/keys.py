from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization
import os

PATH_KEYS = "keys/"

def sign_root(root):
    return Ed25519PrivateKey.from_private_bytes(get_private_key_bytes()).sign(root).hex()

def get_private_key_bytes():
    with open(PATH_KEYS + "private_key.pem", "rb") as f:
        return f.read()[:32]