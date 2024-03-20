# Entering real data in the application

### Scripts
- [bu_json_converter.py](./bu_json_converter.py): python program that reads many "bu" files and turns them into a list (json) and writes to file.
- [populate_db.py](./populate_db.py): checks the existence of .bu files in `./assets/bus/` and populates the database with the information in the files.

# How to use

1. Download the files transmitted for re-totalization, which contain the information of the BUs, such as those available at: [dadosabertos.tse](https://dadosabertos.tse.jus.br/dataset/resultados-2022-arquivos-transmitidos-para-totalizacao)
2. Insert the *.bu* files inside the **./assets/bus/** directory organized into smaller directories with names starting with *"bu"*. For example
	- **./assets/bus/bu-ac**
	- **./assets/bus/bu-sp1**
	- **./assets/bus/bu-goias** 
3. Run *"bu_json_converter.py" or "populate_db.py"*
	- In terminal: ```python3 bu_json_converter.py``` or ```python3 populate_db.py```

## Observations

Urn data originally in **bytes** format is present in JSON in **hexadecimal string** format. The JSON reader program must convert this data back to **bytes** format if it wants to use the original information

The converted data is in the following positions:
 -  *obj['chaveAssinaturaVotosVotavel']*
 -  *obj['urna']['numeroSerieFV']*
 -  *obj['urna']['correspondenciaResultado']['carga']['numeroSerieFC']*
 -  *obj['resultadosVotacaoPorEleicao']['n']['resultadosVotacao']['n']['totaisVotosCargo']['n']['votosVotaveis']['nn']['assinatura']*
	 - n = (0, 1, 2, ..., 11, 12, 13, ...)
	 - nn = (00, 01, 02, ..., 99, 100, 101, ...)
