import logging
import os

from dotenv import load_dotenv

load_dotenv()

BU_TREE_NAME_TEMPLATE = os.getenv('BU_TREE_NAME_TEMPLATE')
TREE_DEFAULT_COMMITMENT_SIZE = os.getenv('TREE_DEFAULT_COMMITMENT_SIZE')
TL_MANAGER_URL = os.getenv('TL_MANAGER_URL')
MONGO_URL = os.getenv('MONGO_URL')

if '${ELECTION_ID}' not in BU_TREE_NAME_TEMPLATE:
    raise Exception("BU_TREE_NAME_TEMPLATE must contain ${ELECTION_ID}")


logging.debug("BU_TREE_NAME_TEMPLATE: %s", BU_TREE_NAME_TEMPLATE)
logging.debug("TL_MANAGER_URL: %s", TL_MANAGER_URL)
logging.debug("MONGO_URL: %s", MONGO_URL)
logging.debug("TREE_DEFAULT_COMMITMENT_SIZE: %s", TREE_DEFAULT_COMMITMENT_SIZE)
