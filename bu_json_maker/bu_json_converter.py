import asn1tools
import glob
import json


# Constants
asn1_specs_path = './assets/specification_files/bu.asn1'
BU_PATH = './assets/bus/bu_ac/o00406-0100700090001.bu'
ALL_BU_FOLDERS_PATH = './assets/bus/'
RESULT_JSON_PATH = 'results/bus.json'


# Helper class to encode BU to JSON
# - Needed to convert fields of type bytes to type hex.
# - Once json is read, hex fields will have to be converted back to bytes
# - JSON does not support bytes
class DictWithBytesToJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (bytes, bytearray)):
            return obj.hex()
        # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)


# Decodes BU with path
def decode_bu(bu_path):
    asn1_converter = asn1tools.compile_files(asn1_specs_path)   # asn1 spec file path

    with open(bu_path, "rb") as file:
        envelope_encoded = bytearray(file.read())
    envelope_decoded = asn1_converter.decode("EntidadeEnvelopeGenerico", envelope_encoded)

    bu_encoded = envelope_decoded['conteudo']
    bu_decoded = asn1_converter.decode('EntidadeBoletimUrna', bu_encoded)

    return bu_decoded


# Converts decoded BU to JSON
def convert_bu_to_json(bu_path):
    bu_decoded = decode_bu(bu_path)
    bu_json = json.dumps(bu_decoded, cls=DictWithBytesToJsonEncoder)    # type bytes are converted to hex
    return bu_json


# Finds path for all BUs in directory
def get_list_files_with_extension_in_directory(extension, path):
    files_list = glob.glob(f'{path}/*.{extension}')
    return files_list


# Get all BUs from directory (in JSON form)
def get_list_all_bus_json_from_path(path):
    files_list = get_list_files_with_extension_in_directory("bu", path)
    bu_list = []

    for file in files_list:
        bu_list.append(convert_bu_to_json(file))
        print(f"{path.rsplit('/', 1)[-1]} {files_list.index(file)} de {len(files_list)}")
        # if files_list.index(file) == 1:   # Stops at only 2 items from each list, for testing purposes
        #     break

    return bu_list


# Get all folders in path which names start with "bu"
def get_all_bu_dirs(path):
    dir_list = sorted(glob.glob(f'{path}/bu*'))
    return dir_list


# Write resulting JSON to file in disk
def write_bus_as_json_to_file(all_bus_path):
    # Get lists of directories to look for BUs
    bus_dirs = get_all_bu_dirs(all_bus_path)

    # Create file or overwrite if it already exists
    hard_file = open(RESULT_JSON_PATH, 'w')
    hard_file.write('[')

    # Iterate directories in path
    bus_json_text = ''
    for bus_dir in bus_dirs:
        bus_json = get_list_all_bus_json_from_path(bus_dir)

        # Iterate BUs in directory
        for bu in bus_json:
            bus_json_text += bu + ','

        # Write data from dir to file
        hard_file.write(bus_json_text)
        bus_json_text = ''  # clean variable before starting next dir

    # Close file after writing content from every directory
    hard_file.close()

    # Open file with bytes writing permissions
    with open(RESULT_JSON_PATH, 'rb+') as f:
        f.seek(-1, 2)
        f.truncate()    # removes last comma
        f.write(bytearray(b']'))    # inserts last closing bracket
        f.close()


# Function to test decoding of generated JSON
def decode_test():
    file = open(RESULT_JSON_PATH, 'r')
    json_obj = json.load(file)

    for item in json_obj:
        print(item)

    print(len(json_obj))


if __name__ == '__main__':
    write_bus_as_json_to_file(ALL_BU_FOLDERS_PATH)
    # decode_test()
