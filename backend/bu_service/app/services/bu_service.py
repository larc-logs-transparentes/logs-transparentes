import base64
import json
import logging

import asn1tools

from app.config.environment import BU_TREE_NAME_TEMPLATE
from app.database.models.bu_model import BuModel, MerkleTreeInfo
from app.database.repositories.bu_repository import save
from app.services.tlmanager_service import insert_creating_tree_if_not_exists

conv = asn1tools.compile_files("app/services/static/bu.asn1")
county_codes = json.load(open("app/services/static/county_codes.json", encoding='utf-8'))


class DictWithBytesToJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (bytes, bytearray)):
            return obj.hex()
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

    for id_eleicao in bu_parsed.eleicoes:
        tree_name = BU_TREE_NAME_TEMPLATE.replace('${ELECTION_ID}', str(id_eleicao))
        logging.info(f"Inserting leaf for election {id_eleicao}")
        response = insert_creating_tree_if_not_exists(tree_name, base64.b64encode(bu_parsed.bu).decode('utf-8'))
        bu_parsed.merkletree_info[str(id_eleicao)] = MerkleTreeInfo(
            tree_name=tree_name,
            index=response.json()['index'],
            hash=response.json()['value'])

    logging.debug("Saving BU to database")
    logging.debug(bu_parsed)
    save(bu_parsed)
    return bu_parsed
