FROM python:3.12.2-bullseye

WORKDIR /app

COPY *.py /app/
COPY requirements.txt /app/
COPY assets /app/assets
COPY gov_codes /app/gov_codes

RUN pip install --no-cache-dir --upgrade -r requirements.txt

ENTRYPOINT [ "python", "populate_db.py"]