### Functions to translate código de município (county code) to UF (state)

import json

# Gets list counties info from file
def get_county_codes_json():
    file = open("./assets/county_codes.json", "r+",encoding="utf8")
    county_list = json.load(file)
    file.close()
    return county_list

# Check the UF of county number
def get_county_uf_and_city_with_number(number):
    counties = get_county_codes_json()
    county = [c for c in counties if c["codigo_tse"] == number]
    if len(county) == 0:
        return {"codigo_tse":number,"uf":"ZZ","nome_municipio":"Externo","capital":0,"codigo_ibge":0}
    return county[0]