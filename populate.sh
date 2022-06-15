DATAS=(
    '{
        "secao": "001", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 98, "partido": "XX"},
            {"nome": "Candidado B", "votos": 36, "partido": "YY"}
    ]}'
    '{
        "secao": "002", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 41, "partido": "XX"},
            {"nome": "Candidado B", "votos": 9, "partido": "YY"}
    ]}'
    '{
        "secao": "003", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 10, "partido": "XX"},
            {"nome": "Candidado B", "votos": 2, "partido": "YY"}
    ]}'
    '{
        "secao": "004", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 51, "partido": "XX"},
            {"nome": "Candidado B", "votos": 43, "partido": "YY"}
    ]}'
    '{
        "secao": "005", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 38, "partido": "XX"},
            {"nome": "Candidado B", "votos": 76, "partido": "YY"}
    ]}'
    '{
        "secao": "006", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 40, "partido": "XX"},
            {"nome": "Candidado B", "votos": 83, "partido": "YY"}
    ]}'
    '{
        "secao": "007", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 30, "partido": "XX"},
            {"nome": "Candidado B", "votos": 29, "partido": "YY"}
    ]}'
    '{
        "secao": "008", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 38, "partido": "XX"},
            {"nome": "Candidado B", "votos": 83, "partido": "YY"}
    ]}'
    '{
        "secao": "009", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 98, "partido": "XX"},
            {"nome": "Candidado B", "votos": 65, "partido": "YY"}
    ]}'
    '{
        "secao": "010", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "votos":[
            {"nome": "Candidado A", "votos": 8, "partido": "XX"},
            {"nome": "Candidado B", "votos": 37, "partido": "YY"}
    ]}'
)

for i in {0..3}
do
    curl -X POST -H "Content-Type: application/json" --data "${DATAS[i]}" localhost:8080/bu
done