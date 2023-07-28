# TLmanager
Transparent log service based on a multi-layer tree structure.

[API documentation](https://redocly.github.io/redoc/?url=https://guilherme-fumagali.github.io/tlmanager-documentation/openapi.json&nocors)

## Instalation

<b> Pre-requisites </b>

- Python 3.9
- MongoDB



<b> Install python dependencies </b>

```bash
    pip install -r requirements.txt
```

<b> Generate a secret key </b>

```bash
    python generate_keys.py
```

<b> Start the server </b>

```bash
    uvicorn main:app --reload
```

<b> Start the server reseting the database </b>

```bash
    RESET="true" uvicorn main:app --reload
```