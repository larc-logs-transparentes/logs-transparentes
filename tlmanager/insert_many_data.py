import time
import requests

def insert_many_data(tree_name, quantity):
    for i in range(quantity):
        insert_leaf(tree_name, str(i))

def insert_leaf(tree_name, data):
    URL = 'http://localhost:8000/insert-leaf'
    data = {
        'tree-name': tree_name,
        'data': data
    }
    response = requests.post(URL, json=data)
    return response.text

if __name__ == '__main__':
    start = time.time()
    insert_many_data('tree1', 1000000)
    end = time.time()