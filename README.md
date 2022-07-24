# logs-transparentes
Estrutura de dados eleitorais que garante integridade, transparência e auditabilidade.

## Visão geral do sistema
A aplicação foi desenvolvida como um conceito sob um novo sistema eleitoral brasileiro que aplica os conceitos da estrutura Merkle Tree. Para isso, os dados contidos nas folhas da árvore são boletins de urnas(comumente chamado de BU), que é um documento emitido pelas própria urna para externalizar alguns dados, que inclui principalmente os votos contabilizados nela.

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
Para todo sistema é funcionar, são necessários inicializar 4 diferentes partes que atuam em conjunto. 
Abrindo um terminal no diretório do projeto para cada módulo, execute:

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
```
cd bu_frontend/
npm install
npm start
```

## Algumas operações possíveis
Com a aplicação inicializada, a tela inicial é renderizada. Nela, podemos visualizar um gráfico que mostra o resultado parcial da eleição. Em conjunto, também temos um botão que dá acesso a última raiz, que chamamos de raiz assinada, que prova essa apuração parcial mostrada.

Na barra lateral esquerda temos as outras funcionalidades da aplicação:
* Consultar BU
* Monitorar
* Retotalizar

Mas antes de executa-las, é necessário inserir os dados na aplicação.

### Popular árvore e BD

No diretório raiz do projeto, execute:

```
./populate.sh
```

Esse script insere 12 BUs fictícios no DB.


### Consultar e Verificar BU
![bu_verificar](https://user-images.githubusercontent.com/77642873/180626063-a08bd380-e018-45d3-a546-0b98d841dca4.png)

Essa funcionalidade permite o usuário encontrar o BU desejado, selecioná-lo, e acessar informações adicionais sobre ele, que contém:
* Votos armazenados nessa urna;
* Resultado da prova de inclusão desse BU na Merkle Tree, junto com os dados usados pelo algoritmo de verificação. Indicado pelas imagens:

<center>

| Prova válida | Prova Inválida |
| :-------------: |:-------------:|
|![cad-verde](https://user-images.githubusercontent.com/77642873/180626237-60dc5438-43f3-436a-8374-c0d685b5d4a6.png)|![cad-vermelho](https://user-images.githubusercontent.com/77642873/180626247-1b7bfdee-68e1-4130-84de-d566fe12fafe.png)|

</center>   

### Monitoração da árvore

Acessando o terceiro item do menu lateral, temos acesso a visão dos monitores da eleição, que recebem os dados e recalculam a Merkle Tree, validando provas de consistência sob a árvore no instante.

Ao clicar em "Capturar transações", a aplicação ficará aguardando por publicações vindas do backend. A cada publicação recebida, será validado a consistência dos dados e o resultado será renderizado na tela:

![monitorar](https://user-images.githubusercontent.com/77642873/180626174-33faa6ba-c29a-4a3d-a649-d1dc299aaab6.png)

<sub>No conceito do projeto, os monitores devem estar capturando os dados desde o início da eleição, portanto, começar a monitorar com o BD populado resulta em dados incosistentes.</sub>

### Reapuração

![retotalizacao](https://user-images.githubusercontent.com/77642873/180626176-fb3a4a61-d90c-499e-a8bc-923e44a44a85.png)

Essa tela permite recalcular os votos da eleição. Ao disparar a retotalização, todos os BUs serão baixados do banco de dados, e será realizado as verificações de:

* Inclusão para todos os BUs;
* Quantidade de BUs recebidos com a quantidade de folhas na Merkle Tree.

Se não houver erros, o resultado será exibido com o nome do candidato seguido da quantidade total de votos dele. Ordenado por quantidade de votos.
