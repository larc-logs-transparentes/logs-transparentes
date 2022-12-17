### Functions to translate código de município (county code) to UF (state)

import json

# Gets list counties info from file
def get_county_codes_json():
    file = open("./assets/counties_codes/county_codes.json", "r+")
    county_list = json.load(file)
    file.close()
    return county_list

# Check the UF of county number
def get_county_uf_with_number(number):
    counties = get_county_codes_json()
    county = [c for c in counties if c["codigo_tse"] == number]

    return county[0]["uf"]
