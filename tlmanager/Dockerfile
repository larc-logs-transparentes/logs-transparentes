FROM python:3.12.2-bullseye as build-stage

WORKDIR /app

RUN mkdir -p /app/keys && cd /app/keys && \
    ssh-keygen -t ed25519 -m PKCS8 -f private_key.pem && \
    mv private_key.pem.pub public_key.pem


    
FROM python:3.12.2-slim-bullseye

WORKDIR /app

COPY --from=build-stage /app /app

COPY config /app/config
COPY controllers /app/controllers
COPY docs /app/docs
#COPY keys /app/keys
COPY routers /app/routers
COPY services /app/services
COPY config /app/config
COPY main.py /app
COPY requirements.txt /app

RUN pip install --no-cache-dir --upgrade -r requirements.txt

ENTRYPOINT [ "uvicorn", "main:app", "--host", "0.0.0.0" ]
