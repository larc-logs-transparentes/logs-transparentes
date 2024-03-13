import os
import requests

from constants import BACKEND_URL


def send_file_to_backend(file_path: str):
    with open(file_path, "rb") as file:
        response = requests.post(BACKEND_URL, files={"file": (os.path.basename(file_path), file)})
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
            break
    #print("---- Finished")


if __name__ == '__main__':
    insert_list_bus_to_db()
