import json
import requests
import time

from constants import BACKEND_URL
from counties_codes import get_county_uf_and_city_with_number


# reads bus from file made with bu_json_converter.py
def get_list_of_dict_bu():
    try:
        file = open("./results/bus_consolidated.json",encoding="utf8")
    except FileNotFoundError:
        file = open("./results/example_bus_consolidated.json",encoding="utf8")
    return json.load(file)


# adds separated _id, id, zona, secao to each bu, and returns a list of bu dicts
def get_candidates_votes_list(bu):
    votosVotaveis = bu["resultadosVotacaoPorEleicao"][0]["resultadosVotacao"][0]["totaisVotosCargo"][0]["votosVotaveis"]
    candidatos = []
    for voto in votosVotaveis:
        if "identificacaoVotavel" in voto:
            candidato = {"partido": voto["identificacaoVotavel"]["partido"],
                         "codigo": voto["identificacaoVotavel"]["codigo"],
                         "votos": voto["quantidadeVotos"],
                         "_id": voto["assinatura"]}
            candidatos.append(candidato)
    return candidatos


def get_body_list_with_zona_secao():
    bus = get_list_of_dict_bu()
    id1 = 0
    id2 = 0
    body_dict_list = []

    # zona and secao are in the bu, so we just copy them from there
    for bu in bus:
        zona = bu['identificacaoSecao']['municipioZona']['zona']
        secao = bu['identificacaoSecao']['secao']
        cod_municipio = bu['identificacaoSecao']['municipioZona']['municipio']
        county = get_county_uf_and_city_with_number(cod_municipio)
        uf = county['uf']
        municipio = county['nome_municipio']
        candidates_votes_list = get_candidates_votes_list(bu)
        body_dict = {
            "_id": id1,
            "id": id2,
            "turno": "2",
            "UF": uf,
            "zona": zona,
            "secao": secao,
            "cidade": municipio.capitalize(),
            "bu_inteiro": bu,
            "__v": 0,
            "votos": candidates_votes_list,
        }

        body_dict_list.append(body_dict)
        id1 += 1
        id2 += 1

    return body_dict_list


# sends one bu (dict) to db via post request
def insert_body_to_db(body_dict):
    header = {
        "content-type": "application/json"
    }
    return requests.post(f"{BACKEND_URL}/bu/create", json=body_dict, headers=header)


def create_tree(tree_name, commitment_size=100):
    header = {
        "content-type": "application/json"
    }
    return requests.post(f"{BACKEND_URL}/bu/create-tree", json={"tree-name": tree_name, "commitment-size": commitment_size}, headers=header)

def initialize_infoBUs_tree():
    header = {
        "content-type": "application/json"
    }
    return requests.post(f"{BACKEND_URL}/infobus/create", headers=header)

# sends list of bus (dicts) to db
def insert_list_bus_to_db():
    bodies = get_body_list_with_zona_secao()
    res_list = []
    for body in bodies:
        res = insert_body_to_db(body)
        print(f'{bodies.index(body)} de {len(bodies)}, {res}', end='\r')
        res_list.append(res)

    return res_list


if __name__ == '__main__':
    create_tree("BUs") #TODO: isso devia estar aqui?
    insert_list_bus_to_db()
    initialize_infoBUs_tree()
