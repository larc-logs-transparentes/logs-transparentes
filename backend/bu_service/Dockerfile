FROM python:3.12.2-bullseye as build-stage

WORKDIR /app

COPY app/ /app/app
COPY main.py /app
COPY requirements.txt /app
COPY .env /app

RUN pip install --no-cache-dir --upgrade -r requirements.txt


FROM python:3.12.2-slim-bullseye

WORKDIR /app

COPY --from=build-stage /app /app
COPY --from=build-stage /usr/local/bin/uvicorn /usr/local/bin/uvicorn
COPY --from=build-stage /usr/local/lib/python3.12 /usr/local/lib/python3.12

ENTRYPOINT [ "uvicorn", "main:app", "--port", "9090", "--host", "0.0.0.0" ]
