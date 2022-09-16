## Visão geral do sistema
Sistema baseado em árvores de Merkle para promover maior transparência e auditabilidade dos dados. 

Esse protótipo é aplicado à eleição brasileira. Assim, armazena de forma transparente os Boletins de Urna (resultado dos votos registrados na urna), e permite verificar a sua integridade. Também permite recontabilizar o resultado da eleição.

Demonstração em vídeo disponível em: https://youtu.be/gRLXQXpbc5s

## Instalação
Instruções para instalação e inicialização da ferramenta nas distribuições linux Ubuntu:

### Dependências

#### 1. nodejs
```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
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

## Algumas operações possíveis
Na tela inicial, é possível visualizar o resultado parcial da eleição. É possível também visualizar a raiz atual da árvore de Merkle, utilizada nas provas de inclusão e consistência.

Outras funcionalidades podem ser acessadas no menu lateral
* Consultar BU
* Monitorar
* Recontabilizar

Entretanto, antes de utiliza-las, é preciso inserir alguns dados na aplicação

### Popular árvore e BD

No diretório raiz do projeto, execute:

```
./populate.sh
```

Esse script insere 12 BUs fictícios no DB.


### Consultar e Verificar BU


Essa funcionalidade permite ao usuário encontrar o BU desejado, selecioná-lo, e acessar informações adicionais sobre ele (e.g., votos registrados na urna).

Também é possível fazer a sua prova de inclusão, verificando a sua integridade. O resultado é evidenciado pelas imagens abaixo:

<center>

| Prova válida | Prova Inválida |
| :-------------: |:-------------:|
|![cad-verde](https://user-images.githubusercontent.com/77642873/180626237-60dc5438-43f3-436a-8374-c0d685b5d4a6.png)|![cad-vermelho](https://user-images.githubusercontent.com/77642873/180626247-1b7bfdee-68e1-4130-84de-d566fe12fafe.png)|

</center>   

![bu_verificar](https://user-images.githubusercontent.com/28439483/182242126-3c9efccb-c449-413d-8b38-ccbb552bec15.png)



### Monitoração da árvore

Essa funcionalidade permite aos monitores que realizem as provas de consistência na Merkle Tree, desse modo monitorando as alterações na raiz da árvore. 

Ao clicar em "Capturar transações", a aplicação ficará aguardando por novas provas de consistência publicadas pelo backend. A cada publicação recebida, a consistência dos dados será validada e o seu resultado será renderizado na tela.

![monitorar](https://user-images.githubusercontent.com/28439483/182241946-667c374f-6dc7-4207-a9fc-a0d2d97cb7ab.png)


<sub>Note que, no protótipo apresentado, os monitores devem estar capturando os dados desde o início da eleição. Portanto, começar a monitorar após a inicialização da árvore resulta em dados incosistentes.</sub>

### Reapuração

Essa funcionalidade permite recalcular os votos da eleição. Ao se iniciar a recontabilização, todos os BUs serão baixados do banco de dados. Então, as seguintes verificações serão realizadas:

* Prova de inclusão do BU;
* Comparação entre a quantidade de BUs recebidas com a quantidade de folhas na Merkle Tree.

Se não houver erros, o resultado final será exibido.

![recontabilizacao](https://user-images.githubusercontent.com/28439483/182241971-d1850ecb-62df-4b38-b32c-a08cb40a7e4d.png)

