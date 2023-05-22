import json
import requests

from constants import BACKEND_URL
from counties_codes import get_county_uf_and_city_with_number
BU_TREE_NAME = "bu_tree"

# reads bus from file made with bu_json_converter.py
def get_list_of_dict_bu():
    try:
        file = open("./results/bus_consolidated.json",encoding="utf8")
    except FileNotFoundError:
        file = open("./results/example_bus_consolidated.json",encoding="utf8")
    return json.load(file)


def candidatos_segundo(bu):
    k=0
    while k<len(bu["resultadosVotacaoPorEleicao"]):
        if bu["resultadosVotacaoPorEleicao"][k]["resultadosVotacao"][0]["totaisVotosCargo"][0]["codigoCargo"][1]=="presidente":
            votosVotaveisPresidente =bu["resultadosVotacaoPorEleicao"][k]["resultadosVotacao"][0]["totaisVotosCargo"][0]["votosVotaveis"]
        if bu["resultadosVotacaoPorEleicao"][k]["resultadosVotacao"][0]["totaisVotosCargo"][0]["codigoCargo"][1]=="governador":
            votosVotaveisGovernador = bu["resultadosVotacaoPorEleicao"][k]["resultadosVotacao"][0]["totaisVotosCargo"][0]["votosVotaveis"]
        k+=1
        
    if len(bu["resultadosVotacaoPorEleicao"]) >1:
        votosVotaveis = {
            "Presidente": votosVotaveisPresidente,
            "Governador": votosVotaveisGovernador,
        }
    else:
        votosVotaveis = {
            "Presidente": votosVotaveisPresidente,
        }
    candidatos = []
    for cargo, votos in votosVotaveis.items():
        for voto in votos:
            if "identificacaoVotavel" in voto:
                candidato = {
                    "cargo": cargo,
                    "partido": voto["identificacaoVotavel"]["partido"],
                    "codigo": voto["identificacaoVotavel"]["codigo"],
                    "votos": voto["quantidadeVotos"],
                    "_id": voto["assinatura"]
                }
                candidatos.append(candidato)
    return candidatos

def candidatos_primeiro(bu):
        votos_votaveis_paths = {
            "deputadoFederal": None,
            "deputadoEstadual": None,
            "senador": None,
            "governador": None,
            "presidente": None
        }

        # Find the specific paths to the votosVotaveis for each cargo
        for i in range(len(bu["resultadosVotacaoPorEleicao"])):
            for j in range(len(bu["resultadosVotacaoPorEleicao"][i]["resultadosVotacao"])):
                for k in range(len(bu["resultadosVotacaoPorEleicao"][i]["resultadosVotacao"][j]["totaisVotosCargo"])):
                    codigo_cargo = bu["resultadosVotacaoPorEleicao"][i]["resultadosVotacao"][j]["totaisVotosCargo"][k]["codigoCargo"][1]
                    if codigo_cargo in votos_votaveis_paths:
                        votos_votaveis_paths[codigo_cargo] = (i, j, k)
        votos_votaveis_paths["Deputado Federal"] = votos_votaveis_paths.pop("deputadoFederal")
        votos_votaveis_paths["Deputado Estadual"] = votos_votaveis_paths.pop("deputadoEstadual")
        votos_votaveis_paths["Presidente"] = votos_votaveis_paths.pop("presidente")
        votos_votaveis_paths["Governador"] = votos_votaveis_paths.pop("governador")
        votos_votaveis_paths["Senador"] = votos_votaveis_paths.pop("senador")
        # Retrieve the votosVotaveis for each cargo using the saved paths
        votos_votaveis = {}
        for cargo, path in votos_votaveis_paths.items():
            if path is None:
                votos_votaveis[cargo] = []
            else:
                i,j, k = path
                votos_votaveis[cargo] = bu["resultadosVotacaoPorEleicao"][i]["resultadosVotacao"][j]["totaisVotosCargo"][k]["votosVotaveis"]
        
        candidatos = []
        for cargo, votos in votos_votaveis.items():
            for voto in votos:
                if "identificacaoVotavel" in voto:
                    candidato = {
                        "cargo": cargo,
                        "partido": voto["identificacaoVotavel"]["partido"],
                        "codigo": voto["identificacaoVotavel"]["codigo"],
                        "votos": voto["quantidadeVotos"],
                        "_id": voto["assinatura"]
                    }

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
        candidates_votes_list = candidatos_primeiro(bu)

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
            # "votosPrimeiroTurno": candidates_votes_list_primeiro,
        }

        body_dict_list.append(body_dict)
        id1 += 1
        id2 += 1

    return body_dict_list


# sends one bu (dict) to db via post request
def insert_body_to_db(tree_name, body_dict):
    header = {
        "content-type": "application/json"
    }
    return requests.post(f"{BACKEND_URL}/bu/create", json={"tree-name": tree_name, "data": body_dict}, headers=header)

def create_tree(tree_name, commitment_size=100):
    header = {
        "content-type": "application/json"
    }
    return requests.post(f"{BACKEND_URL}/tree/create-tree", json={"tree-name": tree_name, "commitment-size": commitment_size}, headers=header)

def commit_tree(tree_name):
    header = {
        "content-type": "application/json"
    }
    return requests.post(f"{BACKEND_URL}/tree/commit", json={"tree-name": tree_name}, headers=header)

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
        res = insert_body_to_db(BU_TREE_NAME, body)
        print(f'{bodies.index(body)} de {len(bodies)}, {res}', end='\r')
        res_list.append(res)

    return res_list


if __name__ == '__main__':
    create_tree(BU_TREE_NAME)
    insert_list_bus_to_db()
    commit_tree(BU_TREE_NAME)
    initialize_infoBUs_tree()
