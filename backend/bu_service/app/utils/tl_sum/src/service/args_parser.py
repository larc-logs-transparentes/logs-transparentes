import argparse
import pathlib

parser = argparse.ArgumentParser(description='Soma os votos de um ou mais arquivos BU')
parser.add_argument('bu_path', help='Arquivo ou diretório de arquivos BU', type=pathlib.Path)