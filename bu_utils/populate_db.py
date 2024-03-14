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


def read_files():
    try:
        files = os.listdir("./assets/bus")
        files = [f"./assets/bus/{file}" for file in files]
    except FileNotFoundError:
        files = os.listdir("./assets/bu_2022_2t_AC")
        files = [f"./assets/bu_2022_2t_AC/{file}" for file in files]
    return files


def insert_list_bus_to_db():
    for file in read_files():
        if file.endswith(".bu") or file.endswith(".busa"):
            send_file_to_backend(file)
    print("---- Finished")


if __name__ == '__main__':
    insert_list_bus_to_db()
    commit_all_trees()
