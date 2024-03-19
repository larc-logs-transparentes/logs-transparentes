FROM python:3.12.2-bullseye

WORKDIR /app

RUN mkdir -p /app/keys && cd /app/keys && \
    ssh-keygen -t ed25519 -m PKCS8 -f private_key.pem && \
    mv private_key.pem.pub public_key.pem

COPY config /app/config
COPY controllers /app/controllers
COPY docs /app/docs
#COPY keys /app/keys
COPY routers /app/routers
COPY services /app/services
COPY config /app/config
COPY main.py /app
COPY requirements.txt /app

RUN pip install -r requirements.txt

ENTRYPOINT [ "uvicorn", "main:app", "--reload" ]
