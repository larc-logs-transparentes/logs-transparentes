import dataclasses
import ijson
import json

def get_json_data_from_file(filename):
    f = open(filename, 'rb')
    objects = ijson.items(f, 'item')
    rows = (o for o in objects)
    return f, rows

def get_json_data_from_dir(dir):
    list_objects = []
    list_files = []
    
    for filename in dir.iterdir():
        if filename.suffix != '.json':
            continue
        f = open(filename, 'rb')
        objects = ijson.items(f, 'item')
        list_files.append(f)
        list_objects.append(objects)
    
    rows = (o for objects in list_objects for o in objects)
    return list_files, rows
        
def print_dict(dict, filename=None, sort_keys=True):
    if filename is not None:
        with open(filename, 'w') as outfile:
            json.dump(dict, outfile, indent=4, cls=_EnhancedJSONEncoder, sort_keys=sort_keys)
    else:
        print(json.dumps(dict, indent=4, cls=_EnhancedJSONEncoder, sort_keys=sort_keys))

def json_str(dict, filename=None, sort_keys=True):
        return json.dumps(dict, indent=4, cls=_EnhancedJSONEncoder, sort_keys=sort_keys)
        
class _EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        return super().default(o)