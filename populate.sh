DATAS=(
    '{
        "_id":"1",
        "id": "1",
        "secao": "001", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 41,"_id": "4"},
            {"partido": "YY", "nome": "Candidado B", "votos": 109,"_id": "3"}
    ]}'
    '{
        "_id":"2",
        "id": "2",
        "secao": "002", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 32,"_id": "6"},
            {"partido": "YY", "nome": "Candidado B", "votos": 19,"_id": "5"}
    ]}'
    '{
        "_id":"3",
        "id": "3",
        "secao": "003", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 96,"_id": "8"},
            {"partido": "YY", "nome": "Candidado B", "votos": 15,"_id": "7"}
    ]}'
    '{
        "_id":"4",
        "id": "4",
        "secao": "004", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 293,"_id": "10"},
            {"partido": "YY", "nome": "Candidado B", "votos": 93,"_id": "9"}
    ]}'
    '{
        "_id":"5",
        "id": "5",
        "secao": "005", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 53,"_id": "12"},
            {"partido": "YY", "nome": "Candidado B", "votos": 72,"_id": "11"}
    ]}'
    '{
        "_id":"6",
        "id": "6",
        "secao": "006", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 21,"_id": "14"},
            {"partido": "YY", "nome": "Candidado B", "votos": 5,"_id": "13"}
    ]}'
    '{
        "_id":"7",
        "id": "7",
        "secao": "007", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 1,"_id": "16"},
            {"partido": "YY", "nome": "Candidado B", "votos": 5,"_id": "15"}
    ]}'
    '{
        "_id":"8",
        "id": "8",
        "secao": "008", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 54,"_id": "18"},
            {"partido": "YY", "nome": "Candidado B", "votos": 12,"_id": "17"}
    ]}'
    '{
        "_id":"9",
        "id": "9",
        "secao": "009", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 41,"_id": "20"},
            {"partido": "YY", "nome": "Candidado B", "votos": 109,"_id": "19"}
    ]}'
    '{
        "_id":"10",
        "id": "10",
        "secao": "010", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 198, "_id": "2"},
            {"partido": "YY", "nome": "Candidado B", "votos": 36,  "_id": "1"}
    ]}'
    '{
        "_id":"11",
        "id": "11",
        "secao": "011", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 41,"_id": "22"},
            {"partido": "YY", "nome": "Candidado B", "votos": 109,"_id": "21"}
    ]}'
    '{
        "_id":"12",
        "id": "12",
        "secao": "012", 
        "zona": "123", 
        "UF": "SP", 
        "turno": "1",
        "__v": "0",
        "votos":[
            {"partido": "XX", "nome": "Candidado A", "votos": 54,"_id": "24"},
            {"partido": "YY", "nome": "Candidado B", "votos": 12,"_id": "23"}
    ]}'
    
)

for i in {0..3}
do
    curl -X POST -H "Content-Type: application/json" --data "${DATAS[i]}" localhost:8080/bu
done

curl localhost:3001/tree
read -r -p "Press any key to continue..." key

for i in {4..7}
do
    curl -X POST -H "Content-Type: application/json" --data "${DATAS[i]}" localhost:8080/bu
done

curl localhost:3001/tree
read -r -p "Press any key to continue..." key

for i in {8..11}
do
    curl -X POST -H "Content-Type: application/json" --data "${DATAS[i]}" localhost:8080/bu
done

curl localhost:3001/tree