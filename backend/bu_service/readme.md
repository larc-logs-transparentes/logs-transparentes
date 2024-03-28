# Serviço de inserção de Boletim de Urna

API de escrita de Boletins de Urnas no sistema Election Transparency

### Dependências

- MongoDB 
- TLManager
- Python 3 e pip

Para instalar as dependências `python`:

``` bash
pip install -r requirements.txt
```

### Variáveis de ambiente

| Nome                         | Valor _default_           | Descrição                                                                                                                                                                                                                                                                            |
|------------------------------|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MONGO_URL                    | mongodb://localhost:27017 | URL de conexão com Banco de Dados [MongoDB](https://www.mongodb.com/pt-br) no formato [_Standard_](https://www.mongodb.com/pt-br/docs/manual/reference/connection-string/#standard-connection-string-format).                                                                        |
| TL_MANAGER_URL               | http://127.0.0.1:8000     | URL de conexão com a API do [TLManager](https://github.com/larc-logs-transparentes/tlmanager).                                                                                                                                                                                       |
| TREE_NAME_PREFIX             | eleicao_                  | Prefixo das árvores criadas no TLManager pelo serviço, concatenado com o id da eleição correspondente.                                                                                                                                                                               |
| TREE_DEFAULT_COMMITMENT_SIZE | 8                         | Valor de _commitment size_ das árvores criadas. Define o tamanho máximo do _buffer_ de folhas antes de disparar a inserção na árvore local de eleição, seguida da inserção da raiz dessa árvore local na árvore global, que consequentemente dispara uma nova raiz global assinada. |

### Execução

No diretório `bu_service/`:

```bash
uvicorn --port 9090 main:app
```

Caso deseje excluir o estado presente no Banco de Dados:

```bash
RESET="true" uvicorn --port 9090 main:app
```

#### Docker

Para gerar a imagem Docker:

```bash
docker build -t bu_service .
```

Para instanciar a imagem Docker:

```bash
docker run --network host bu_service
```

Para instanciar a imagem Docker com a variável de ambiente `RESET`:

```bash
docker run --network host -e RESET="true" bu_service
```

OBS: O parâmetro `--network host` deve ser utilizado para que o container possa acessar o MongoDB e o TLManager que estão rodando na máquina local.

## Funcionamento

### Inserção de Boletim de Urna

1) Recebe um Boletim de Urna em formato binário ".bu", através do verbo POST como um arquivo [_Multipart-Encoded_](https://requests.readthedocs.io/en/latest/user/quickstart/#post-a-multipart-encoded-file) descrito no [bu_controller](app/controllers/bu_controller.py).
2) Converte o binário para um objeto JSON manipulável.
3) Envia para o TLManager o binário codificado em base64.
4) Se for o primeiro Boletim de Urna da eleição, cria uma nova árvore usando TREE_NAME_PREFIX e TREE_DEFAULT_COMMITMENT_SIZE.
5) Salva os dados obtidos no Banco de Dados no formato descrito em [bu_model](app/database/models/bu_model.py).
