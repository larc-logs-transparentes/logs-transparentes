FROM python:3.12.2-bullseye

WORKDIR /app

COPY config /app/config
COPY controllers /app/controllers
COPY docs /app/docs
COPY keys /app/keys
COPY routers /app/routers
COPY services /app/services
COPY config /app/config
COPY main.py /app
COPY requirements.txt /app

RUN pip install -r requirements.txt

ENTRYPOINT [ "uvicorn", "main:app", "--reload" ]
