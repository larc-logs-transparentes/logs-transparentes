FROM python:3.12.2-bullseye as build-stage

WORKDIR /app

COPY *.py /app/
COPY requirements.txt /app/
COPY assets /app/assets
COPY gov_codes /app/gov_codes

RUN pip install --no-cache-dir --upgrade -r requirements.txt


FROM python:3.12.2-slim-bullseye

WORKDIR /app

COPY --from=build-stage /app /app
COPY --from=build-stage /usr/local/bin/uvicorn /usr/local/bin/uvicorn
COPY --from=build-stage /usr/local/lib/python3.12 /usr/local/lib/python3.12

ENTRYPOINT [ "python", "populate_db.py"]