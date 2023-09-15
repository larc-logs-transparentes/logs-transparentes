import asn1tools
import glob
import os
import json


from constants import ASN1_SPECS_PATH, RESULT_FOLDER, ALL_BU_FOLDERS_PATH


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
    asn1_converter = asn1tools.compile_files(ASN1_SPECS_PATH)   # asn1 spec file path

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
    files_list.extend(get_list_files_with_extension_in_directory("busa", path))
    bu_list = []

    for file in files_list:
        bu_list.append(convert_bu_to_json(file))
        print(f"{path.rsplit('/', 1)[-1]} {files_list.index(file)} of {len(files_list)}", end='\r')
    print(f"{path.rsplit('/', 1)[-1]} {len(files_list)} of {len(files_list)}")
    print();
    
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
    if not os.path.exists(RESULT_FOLDER):
        os.makedirs(RESULT_FOLDER)

    # Iterate directories in path
    for bus_dir in bus_dirs:
        print(bus_dir)
        if os.path.exists(f'{RESULT_FOLDER}/{bus_dir.rsplit("/", 1)[-1]}.json'):
            os.remove(f'{RESULT_FOLDER}/{bus_dir.rsplit("/", 1)[-1]}.json')
            
        hard_file = open(f'{RESULT_FOLDER}/{bus_dir.rsplit("/", 1)[-1]}.json', 'a')
        hard_file.write('[')

        bus_json_text = ''
        bus_json = get_list_all_bus_json_from_path(bus_dir)

        # Iterate BUs in directory
        for bu in bus_json:
            bus_json_text += bu + ','

        bus_json_text = bus_json_text[:-1] + ']'
    
        # Write data from dir to file
        hard_file.write(bus_json_text)
        # Close file after writing content from every directory
        hard_file.close()

        bus_json_text = ''  # clean variable before starting next dir
        
if __name__ == '__main__':
    write_bus_as_json_to_file(ALL_BU_FOLDERS_PATH)
