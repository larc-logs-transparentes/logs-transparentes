import ijson
import time
import requests
import os

from constants import BACKEND_URL
from counties_codes import get_county_uf_and_city_with_number
BU_TREE_NAME = "bu_tree"
header = {
    "content-type": "application/json"
}

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

def parse_bu(bu, id, primeiro_turno=True):
    zona = bu['identificacaoSecao']['municipioZona']['zona']
    secao = bu['identificacaoSecao']['secao']
    cod_municipio = bu['identificacaoSecao']['municipioZona']['municipio']
    county = get_county_uf_and_city_with_number(cod_municipio)
    uf = county['uf']
    municipio = county['nome_municipio']
    candidates_votes_list = candidatos_primeiro(bu) if primeiro_turno else candidatos_segundo(bu)
    
    return {
        "_id": id,
        "id": id,
        "turno": "1" if primeiro_turno else "2",
        "UF": uf,
        "zona": zona,
        "secao": secao,
        "cidade": municipio.capitalize(),
        "bu_inteiro": bu,
        "__v": 0,
        "votos": candidates_votes_list,
    }
    
# sends one bu (dict) to db via post request
def insert_body_to_db(tree_name, body_dict):
    try:
        return requests.post(f"{BACKEND_URL}/bu/create", json={"tree-name": tree_name, "data": body_dict}, headers=header)
    except ConnectionError:
        time.sleep(5)
        return insert_body_to_db(tree_name, body_dict)

def create_tree(tree_name, commitment_size=100):
    return requests.post(f"{BACKEND_URL}/tree/create-tree", json={"tree-name": tree_name, "commitment-size": commitment_size}, headers=header)

def commit_tree(tree_name):
    return requests.post(f"{BACKEND_URL}/tree/commit", json={"tree-name": tree_name}, headers=header)

def initialize_infobus_tree():
    return requests.post(f"{BACKEND_URL}/infobus/create", headers=header)

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
    initialize_infobus_tree()
