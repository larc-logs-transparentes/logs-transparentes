DATAS=(
    '{
        "_id":"0",
        "id": "0",
        "secao": "001", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 198, "_id": "2"},
            {"partido": "YY", "nome": "Candidado B", "votos": 36,  "_id": "1"}
    ]}'
    '{
        "_id":"1",
        "id": "1",
        "secao": "002", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 41,"_id": "5"},
            {"partido": "YY", "nome": "Candidado B", "votos": 109,"_id": "6"}
    ]}'
)

for i in {0..1}
do
    curl -X POST -H "Content-Type: application/json" --data "${DATAS[i]}" localhost:8080/bu
done