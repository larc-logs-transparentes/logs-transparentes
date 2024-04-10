import logging

import asn1tools
import json
import base64
import os

from app.database.models.bu_model import BuModel, MerkleTreeInfo
from app.database.repositories.bu_repository import save
from app.adapter.tlmanager_adapter import *

TREE_NAME_PREFIX = os.getenv('TREE_NAME_PREFIX')
TREE_DEFAULT_COMMITMENT_SIZE = os.getenv('TREE_DEFAULT_COMMITMENT_SIZE')

conv = asn1tools.compile_files("app/services/bu.asn1")
county_codes = json.load(open("app/services/static/county_codes.json", encoding='utf-8'))


class DictWithBytesToJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (bytes, bytearray)):
            return obj.hex()
        # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)


def convert_file_to_bu_dict(bu: bytes):
    envelope_decoded = conv.decode("EntidadeEnvelopeGenerico", bu)

    bu_encoded = envelope_decoded['conteudo']
    bu_decoded = conv.decode('EntidadeBoletimUrna', bu_encoded)

    return bu_decoded


def get_uf_and_municipio_from_code(uf_municipio_code: str):
    try:
        return county_codes[uf_municipio_code]
    except KeyError:
        return {
            "codigo_tse": uf_municipio_code,
            "uf": "ZZ",
            "nome_municipio": "Externo"
        }


def parse_bu(bu: dict, bu_raw: bytes, filename):
    zona = bu['identificacaoSecao']['municipioZona']['zona']
    secao = bu['identificacaoSecao']['secao']

    uf_municipio_code = bu['identificacaoSecao']['municipioZona']['municipio']
    county = get_uf_and_municipio_from_code(str(uf_municipio_code))

    return BuModel(
        eleicoes=[e['idEleicao'] for e in bu['resultadosVotacaoPorEleicao']],
        filename=filename,
        UF=county['uf'],
        zona=zona,
        secao=secao,
        municipio=county['nome_municipio'],
        bu_json=json.dumps(bu, cls=DictWithBytesToJsonEncoder),
        bu=bu_raw,
        merkletree_info={}
    )


def insert(file_content: bytes, filename: str):
    logging.debug("Trying to decode file using bu ASN.1 schema")
    bu_decoded = convert_file_to_bu_dict(file_content)
    logging.debug(bu_decoded)

    logging.debug("Parsing BU")
    bu_parsed = parse_bu(bu_decoded, file_content, filename)
    logging.debug(bu_parsed)

    for eleicao in bu_parsed.eleicoes:
        logging.info(f"Inserting leaf for election {eleicao}")
        response = insert_leaf(f'{TREE_NAME_PREFIX}{eleicao}', base64.b64encode(bu_parsed.bu).decode('utf-8'))
        logging.info(response.json())
        if response.status_code != 200 and response.json().get('message') == "Tree does not exist":
            logging.info(f"Creating tree for election {eleicao}")
            create_tree(f'{TREE_NAME_PREFIX}{eleicao}', TREE_DEFAULT_COMMITMENT_SIZE)
            logging.info(response.json())

            logging.info(f"Trying to insert leaf for election {eleicao} again")
            response = insert_leaf(f'{TREE_NAME_PREFIX}{eleicao}', base64.b64encode(bu_parsed.bu).decode('utf-8'))
            logging.info(response.json())
            if response.status_code != 200:
                raise Exception("Failed to insert leaf")
        bu_parsed.merkletree_info[str(eleicao)] = MerkleTreeInfo(
            tree_name=f'{TREE_NAME_PREFIX}{eleicao}',
            index=response.json()['index'],
            hash=response.json()['value'])

    logging.debug("Saving BU to database")
    logging.debug(bu_parsed)
    save(bu_parsed)


