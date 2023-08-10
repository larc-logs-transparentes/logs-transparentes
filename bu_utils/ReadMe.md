# Entering real data in the application

### Scripts
- [bu_json_converter.py](./bu_json_converter.py): Python program that reads multiple "bu" files and turns them into a list (json) and writes to file.
- [populate_db.py](./populate_db.py): Checks the data present in the "results/" directory, and inserts real data if it exists, or the data available for example if not.

# How to use

1. Download the files transmitted for re-totalization, which contain the information of the BUs, such as those available at: [dadosabertos.tse](https://dadosabertos.tse.jus.br/dataset/resultados-2022-arquivos-transmitidos-para-totalizacao)
2. Insert the *.bu* files inside the **./assets/bus/** directory organized into smaller directories with names starting with *"bu"*. For example
	- **./assets/bus/bu-ac**
	- **./assets/bus/bu-sp1**
	- **./assets/bus/bu-goias** 
3. Run *"bu_json_converter.py"*: 
	- In terminal: ```python3 bu_json_converter.py```
4. Wait for the program to finish running. Progression by directory is displayed during processing
5. At the end, JSON files are generated in: *"./results/"*. These files can be read by other programs to generate objects representing the BUs.

## Observations

Urn data originally in **bytes** format is present in JSON in **hexadecimal string** format. The JSON reader program must convert this data back to **bytes** format if it wants to use the original information

The converted data is in the following positions:
 -  *obj['chaveAssinaturaVotosVotavel']*
 -  *obj['urna']['numeroSerieFV']*
 -  *obj['urna']['correspondenciaResultado']['carga']['numeroSerieFC']*
 -  *obj['resultadosVotacaoPorEleicao']['n']['resultadosVotacao']['n']['totaisVotosCargo']['n']['votosVotaveis']['nn']['assinatura']*
	 - n = (0, 1, 2, ..., 11, 12, 13, ...)
	 - nn = (00, 01, 02, ..., 99, 100, 101, ...)
