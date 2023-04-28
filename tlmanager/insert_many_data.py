import time
import requests

def insert_leaf(tree_name, data):
    URL = 'http://localhost:8000/insert-leaf'
    data = {
        'tree-name': tree_name,
        'data': data
    }
    response = requests.post(URL, json=data)
    return response

def create_tree(tree_name, commitment_size):
    URL = 'http://localhost:8000/tree-create'
    data = {
        'tree-name': tree_name,
        'commitment-size': commitment_size
    }
    response = requests.post(URL, json=data)
    return response

def commit_tree(tree_name):
    URL = 'http://localhost:8000/tree/commit'
    data = {
        'tree-name': tree_name
    }
    response = requests.post(URL, json=data)
    return response

if __name__ == '__main__':
    start = time.time()
    create_tree('tree1', 2048)
    for i in range(1000000):
        print(i, end='\r')
        response = insert_leaf('tree1', str(i))
        if response.status_code != 200:
            print(response.json())
            break
    commit_tree('tree1')
    end = time.time()
    print(f'Time elapsed: {end - start}')