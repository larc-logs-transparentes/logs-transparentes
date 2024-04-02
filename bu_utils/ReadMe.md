# Entering real data in the application

### Scripts
- [populate_db.py](./populate_db.py): checks the existence of .bu files in `./assets/bus/` and populates the database with the information in the files.
- [requirements.txt](./requirements.txt): list of dependencies for the script to run.

# How to use

## With real data

1. Download the files transmitted for re-totalization, which contain the information of the BUs, such as those available at: [dadosabertos.tse](https://dadosabertos.tse.jus.br/dataset/resultados-2022-arquivos-transmitidos-para-totalizacao)
2. Insert the *.bu* files inside the **./assets/bus/** directory organized into smaller directories with names starting with *"bu"*. For example
	- **./assets/bus/bu-ac**
	- **./assets/bus/bu-sp1**
	- **./assets/bus/bu-goias** 
3. Run *"populate_db.py"*
	- In terminal: ```python3 populate_db.py```

## With mocked data

If you don't have the data, you can use the mocked data available in the **./assets/mocked_bus/** directory.

When the script does not find the data in the **./assets/bus/** directory, it will use the data in the **./assets/mocked_bus/** directory.

Thus, to use the mocked data, follow the steps below:

1. Run the script *"populate_db.py"* 
	- In terminal: ```python3 populate_db.py```