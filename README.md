# Logs Transparentes para transparência dos dados
#### Sistema baseado em árvores de Merkle para promover maior transparência e auditabilidade dos dados. 

## Visão geral 

Esse protótipo é aplicado à eleição brasileira. Assim, armazena de forma transparente os Boletins de Urna (resultado dos votos registrados na urna), e permite verificar a sua integridade. Também permite recontabilizar o resultado da eleição.

* Publicação na SBSeg 2022 ([Artigo](https://sol.sbc.org.br/index.php/sbseg_estendido/article/view/21696/21520)) ([Vídeo](https://youtu.be/gRLXQXpbc5s "SBSeg"))

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

#### 2. Mongodb
```
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install mongodb-org
sudo systemctl start mongod.service
sudo systemctl start mongod
```

#### 3. Python3, pip e dependências
<sup>O Ubuntu a partir da versão 20.04 vêm com o Python3 pré-instalado.</sup>
```
sudo apt install python3
sudo apt install python3-pip
pip install -r bu_json_maker/requirements.txt
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
npm start
```

#### 3. Front-end
<sup>Requisitos: node versão 10.19.0</sup>
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
### Consultar e Verificar BU

Essa funcionalidade permite ao usuário encontrar o BU desejado, selecioná-lo, e acessar informações adicionais sobre ele (e.g., votos registrados na urna).

Também é possível fazer a sua prova de inclusão, verificando a sua integridade. O resultado é evidenciado pelas imagens abaixo:

<center>

| Prova válida | Prova Inválida |
| :-------------: |:-------------:|
|![cad-verde](https://user-images.githubusercontent.com/77642873/180626237-60dc5438-43f3-436a-8374-c0d685b5d4a6.png)|![cad-vermelho](https://user-images.githubusercontent.com/77642873/180626247-1b7bfdee-68e1-4130-84de-d566fe12fafe.png)|

</center>   

![bu_verificar](https://user-images.githubusercontent.com/28439483/182242126-3c9efccb-c449-413d-8b38-ccbb552bec15.png)

### Consultar cidade

Essa interface permite que o usuário selecione uma cidade de preferência e verifique o resultado da eleição nela.

Assim que selecionado, é feita uma verificação parcial cujo resultado é explicitado pela imagem dos cadeados, da mesma forma que em "Consultar e verificar BU". Ao clicar no cadeado, é possível visualizar os dados referentes a prova, como na imagem:

![Consultar cidade](https://user-images.githubusercontent.com/77642873/219463256-85962132-aa9b-4f12-a39d-d3a92ae76109.png)

Também é disponível ao usuário um botão que redireciona a uma prova completa dos BUs referente a cidade selecionada.

### Histórico da árvore

Essa funcionalidade permite aos monitores que realizem as provas de consistência na Merkle Tree, desse modo monitorando as alterações na raiz da árvore. 

Ao clicar em "Verificar integridade", a aplicação validará todas as provas de consistência publicadas pelo backend. A cada publicação verificada, o resultado será renderizado na tela, como na imagem:

![Histórico da árvore](https://user-images.githubusercontent.com/77642873/219463486-38a39714-b0ec-4205-9c09-1e8f5fd32278.png)

Abaixo da tabela, é mostrado os dados referentes a cada prova de consistência verificada.

### Reapuração

Essa funcionalidade permite recalcular os votos da eleição. Ao se iniciar a recontabilização, todos os BUs serão baixados do banco de dados. Então, as seguintes verificações serão realizadas:

* Prova de inclusão do BU;
* Comparação entre a quantidade de BUs recebidas com a quantidade de folhas na Merkle Tree.

Se não houver erros, o resultado final será exibido.

![recontabilizacao](https://user-images.githubusercontent.com/28439483/182241971-d1850ecb-62df-4b38-b32c-a08cb40a7e4d.png)

