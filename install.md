
## Instalação
Instruções para instalação e inicialização da ferramenta nas distribuições linux Ubuntu:

### Dependências

#### 1. nodejs
```
sudo apt update
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. Mosquitto
```
sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
sudo apt-get update
sudo apt install mosquitto
```

#### 3. Mongodb
```
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install mongodb-org
sudo systemctl start mongod.service
sudo systemctl start mongod
```

#### 4. Git
```
sudo apt-get install git
```

### Download
```
git clone https://github.com/larc-tse/logs-transparentes.git
```

### Inicialização
O sistema é composto por 4 diferentes partes que atuam em conjunto. Abrindo um terminal no diretório do projeto para cada módulo, execute:

#### 1. Back-end
```
cd bu_backend/
npm install
npm start
```

#### 2. Merkle Tree
```
cd merkleTree/
npm install
node app.js
```

#### 3. Mosquitto
```
cd bu_backend/
sudo ./init_broker_UBUNTU.sh 
```

Caso essa porta já estiver sendo usada no sistema, execute o ".sh" seguido de um número de porta. Como no exemplo:

```
sudo ./init_broker_UBUNTU.sh 3032
```

E altere a configuração de portas do projeto nos arquivos:

* bu_backend/src/config/config.js

* bu_frontend/src/config.json

#### 4. Front-end
Requisitos: node versão 10.19.0

```
cd bu_frontend/
npm install
npm start
```



## Utilização
Na tela inicial, é possível visualizar o resultado parcial da eleição. É possível também visualizar a raiz atual da árvore de Merkle, utilizada nas provas de inclusão e consistência.

Outras funcionalidades podem ser acessadas no menu lateral
* Consultar BU
* Consultar Cidade
* Histórico da árvore
* Recontabilizar

Entretanto, antes de utilizá-las, é preciso inserir alguns dados na aplicação

### Popular árvore e BD
O protótipo oferece suporte a dados reais das eleições brasileiras, para isso, consultar a [documentação para inserção de dados reais](https://github.com/larc-logs-transparentes/logs-transparentes/tree/main/bu_json_maker#readme).

```
cd bu_json_maker
python3 bu_bd_scripts.py
```