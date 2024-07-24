FROM python:3.12.2-slim-bullseye

WORKDIR /app

COPY app/ /app/app
COPY main.py /app
COPY requirements.txt /app
COPY .env /app

RUN pip install --no-cache-dir --upgrade -r requirements.txt

ENTRYPOINT [ "uvicorn", "main:app", "--port", "9090", "--host", "0.0.0.0" ]
