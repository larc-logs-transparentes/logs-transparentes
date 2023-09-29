import ijson
import requests
import os

from constants import BACKEND_URL
from assets.counties_codes import get_county_uf_and_city_with_number

BU_TREE_NAME = "bu_tree"
header = {
    "content-type": "application/json"
}

def parse_bu(bu):
    zona = bu['identificacaoSecao']['municipioZona']['zona']
    secao = bu['identificacaoSecao']['secao']
    cod_municipio = bu['identificacaoSecao']['municipioZona']['municipio']
    county = get_county_uf_and_city_with_number(cod_municipio)
    uf = county['uf']
    municipio = county['nome_municipio']

    eleicoes = []
    for eleicao in bu['resultadosVotacaoPorEleicao']:
        id_eleicao = eleicao['idEleicao']

        eleicoes.append({
            "id_eleicao": id_eleicao,
            "UF": uf,
            "zona": zona,
            "secao": secao,
            "cidade": municipio.capitalize(),
            "bu_inteiro": bu,
        })
    
    return eleicoes
    
# sends one bu (dict) to db via post request
def insert_body_to_db(tree_name, body_dict):
    return requests.post(f"{BACKEND_URL}/bu/create", json={"tree_name": tree_name, "data": body_dict}, headers=header)

def create_tree(tree_name, commitment_size=100):
    return requests.post(f"{BACKEND_URL}/tree/create-tree", json={"tree_name": tree_name, "commitment_size": commitment_size}, headers=header)

def commit_tree(tree_name):
    return requests.post(f"{BACKEND_URL}/tree/commit", json={"tree_name": tree_name}, headers=header)


def read_files():
    try:
        files = os.listdir("./results")
        files = [f"./results/{file}" for file in files]
    except FileNotFoundError:
        files = ["./assets/example_bus_consolidated.json"]
    return files

# sends list of bus (dicts) to db
def insert_list_bus_to_db():
    _id = 0
    for file in read_files():
        if file.endswith(".json"):
            print(f"Reading {file}", end=' ', flush=True)
            json_bus = ijson.items(open(file, "rb"), "item")
            jsons = (o for o in json_bus)
            for bu in jsons:                
                res = insert_body_to_db(BU_TREE_NAME, parse_bu(bu, _id))
                if res.status_code != 200:
                    print(f"Error: {res.text}")
                    return
                _id += 1
            print("---- Finished")

if __name__ == '__main__':
    create_tree(BU_TREE_NAME)
    insert_list_bus_to_db()
    commit_tree(BU_TREE_NAME)
