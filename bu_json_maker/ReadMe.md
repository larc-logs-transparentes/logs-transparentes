# Read me

Este é um programa Python que lê múltiplos arquivos "bu" e transforma-os em uma lista (json) e escreve em arquivo.


# Como usar

1. Instale os *requirements*: 
	- *pip install -r requirements.txt*
2. Insira os arquivos *.bu* dentro do diretório **./assets/bus/** organizados em diretórios menores com nomes iniciados com *"bu"*. Por exemplo:
	- **./assets/bus/bu-ac**
	- **./assets/bus/bu-sp1**
	- **./assets/bus/bu-goias** 
3. Rode o programa *"bu_json_converter.py"*: 
	- No terminal: *python3 bu_json_converter.py*
	- Ou na IDE de sua preferência
4. Aguarde o programa terminar de rodar. A progressão por diretório é exibida durante o processamento
5. Ao final é gerado um arquivo JSON é gerado: *"./results/bus.json"*. Este arquivo pode ser lido por outros programas para gerar objetos representando os BUs.

## Observações

Dados da urna originalmente no formato **bytes** estão presentes no JSON no formato **string de hexadecimal**. O programa leitor do JSON deverá converter esses dados novamente para o formato **bytes** se desejar usar a informação original.

Os dados convertidos estão nas seguintes posições: 
 -  *obj['chaveAssinaturaVotosVotavel']*
 -  *obj['urna']['numeroSerieFV']*
 -  *obj['urna']['correspondenciaResultado']['carga']['numeroSerieFC']*
 -  *obj['resultadosVotacaoPorEleicao']['n']['resultadosVotacao']['n']['totaisVotosCargo']['n']['votosVotaveis']['nn']['assinatura']*
	 - n = números de um digito ou mais (0, 1, 2, ..., 11, 12, 13, ...)
	 - nn = números de dois dígitos ou mais (00, 01, 02, ..., 99, 100, 101, ...)

## 