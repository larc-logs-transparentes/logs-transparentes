import json
import os


county_codes = json.load(open(os.path.join(os.path.dirname(__file__), 'country_codes_hash.json'), 'r', encoding='utf-8'))


def get_state_from_code(code):
    """
    Retorna o estado de um BU.
    """
    try:
        return county_codes[str(code)]['uf']
    except KeyError:
        return 'ZZ'

def get_municipio_from_code(code):
    """
    Retorna o estado de um BU.
    """
    try:
        return county_codes[str(code)]['nome_municipio']
    except KeyError:
        return 'ZZ'
