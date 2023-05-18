import time
import requests

def insert_leaf(tree_name, data):
    URL = 'http://localhost:8000/insert-leaf'
    data = {
        'tree-name': tree_name,
        'data': data
    }
    #doenst wait for response
    try:
        response = requests.post(URL, json=data, timeout=0.0000000001)
    except requests.exceptions.ReadTimeout:
        pass

    return True

def create_tree(tree_name, commitment_size):
    URL = 'http://localhost:8000/tree-create'
    data = {
        'tree-name': tree_name,
        'commitment-size': commitment_size
    }
    try:
        response = requests.post(URL, json=data, timeout=0.0000000001)
    except requests.exceptions.ReadTimeout:
        pass
    return True

def commit_tree(tree_name):
    URL = 'http://localhost:8000/tree/commit'
    data = {
        'tree-name': tree_name
    }
    try:
        response = requests.post(URL, json=data, timeout=0.0000000001)
    except requests.exceptions.ReadTimeout:
        pass

    return True

if __name__ == '__main__':
    start = time.time()
    create_tree('tree1', 2048)
    for i in range(1000000):
        response = insert_leaf('tree1', str(i))
    commit_tree('tree1')
    end = time.time()
    print(f'Time elapsed: {end - start}')