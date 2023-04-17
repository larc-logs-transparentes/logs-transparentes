# TLManager

## Pre-requisites

- Python 3.7
- MongoDB

## To init

### Install python dependencies

```bash
    pip install -r requirements.txt
```

### Generate a secret key

```bash
    python generate_keys.py
```

### Start the server

```bash
    uvicorn main:app --reload
```
