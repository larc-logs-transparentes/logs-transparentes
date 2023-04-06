from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization
import os

PATH_KEYS = "keys/"

def sign_root(root):
    return Ed25519PrivateKey.from_private_bytes(get_private_key_bytes()).sign(root).hex()

def generate_keys():
    if not os.path.exists(PATH_KEYS):
        os.makedirs(PATH_KEYS)
    if not os.path.exists(PATH_KEYS + "private_key.pem"):
        private_key = Ed25519PrivateKey.generate()
        print("Generating keys...")
        with open(PATH_KEYS + "private_key.pem", "wb") as f:
            f.write(private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.PKCS8,
                encryption_algorithm=serialization.NoEncryption(),
            ))
        with open(PATH_KEYS + "public_key.pem", "wb") as f:
            f.write(private_key.public_key().public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo,
            ))
        print("Keys generated successfully!")

def get_private_key_bytes():
    with open(PATH_KEYS + "private_key.pem", "rb") as f:
        return f.read()[:32]
    
if __name__ == "__main__":
    generate_keys()