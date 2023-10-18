import ijson
import requests
import os

from constants import BACKEND_URL
from assets.counties_codes import get_county_uf_and_city_with_number

BU_TREE_NAME_PREFIX = "bu_tree_election_"
header = {
    "content-type": "application/json"
}

# sends one bu (dict) to db via post request
def insert_body_to_db(body_dict):
    return requests.post(f"{BACKEND_URL}/bu/create", json={"bu": body_dict}, headers=header)

def read_files():
    try:
        files = os.listdir("./results")
        files = [f"./results/{file}" for file in files]
    except FileNotFoundError:
        files = ["./assets/example_bus_consolidated.json"]
    return files

# sends list of bus (dicts) to db
def insert_list_bus_to_db():
    for file in read_files():
        if file.endswith(".json"):
            print(f"Reading {file}", end=' ', flush=True)
            json_bus = ijson.items(open(file, "rb"), "item")
            jsons = (o for o in json_bus)
            for json in jsons:
                insert_body_to_db(json)
            print("---- Finished")

if __name__ == '__main__':
    insert_list_bus_to_db()
