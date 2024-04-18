import os
import requests

from constants import BACKEND_URL


def commit_all_trees():
    response = requests.post(f'{BACKEND_URL}/tree/commit-all-trees')
    print(response.json())
    return response


def send_file_to_backend(file_path: str):
    print(f"Sending file {file_path} to backend")
    with open(file_path, "rb") as file:
        response = requests.post(f'{BACKEND_URL}/bu/create', files={"file": (os.path.basename(file_path), file)})
        print(response.json())
        return response


def read_bu_or_busa_files():
    files = [os.path.join(root, name)
                for root, dirs, files in os.walk("./assets/bus")
                for name in files if name.endswith((".bu", ".busa"))]
    
    if not files:
        files = os.listdir("./assets/mocked_bus")
        files = [f"./assets/mocked_bus/{file}" for file in files]
        
    return files


def insert_list_bus_to_db():
    for file in read_bu_or_busa_files():
        send_file_to_backend(file)
    print("---- Finished")


if __name__ == '__main__':
    insert_list_bus_to_db()
    commit_all_trees()
