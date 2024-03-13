import base64

import asn1tools
import json

conv = asn1tools.compile_files("app/services/bu.asn1")
county_codes = json.load(open("app/services/static/county_codes.json"))


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

    print(bu_decoded)
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


def parse_bu(bu: dict, bu_raw: bytes):
    zona = bu['identificacaoSecao']['municipioZona']['zona']
    secao = bu['identificacaoSecao']['secao']

    uf_municipio_code = bu['identificacaoSecao']['municipioZona']['municipio']
    county = get_uf_and_municipio_from_code(uf_municipio_code)

    print()

    return {
        "eleicoes": [e['idEleicao'] for e in bu['resultadosVotacaoPorEleicao']],
        "UF": county['uf'],
        "zona": zona,
        "secao": secao,
        "municipio": county['nome_municipio'],
        "bu_json": json.dumps(bu, cls=DictWithBytesToJsonEncoder),
        "bu": bu_raw
    }

def save_bu(bu: dict):
    pass

def insert(file_content: bytes):
    bu_decoded = convert_file_to_bu_dict(file_content)
    bu_parsed = parse_bu(bu_decoded, file_content)
    save_bu(bu_parsed)

