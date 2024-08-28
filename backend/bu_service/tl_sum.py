from app.utils.tl_sum.src.bu_functions import soma_votos, soma_votos_por_municipio
from app.utils.tl_sum.src.service.args_parser import parser
from app.utils.tl_sum.src.service.json_utils import get_json_data_from_file, get_json_data_from_dir, print_dict, json_str
from app.database.repositories.sum_result_repository import update_or_insert
from app.database.models.sum_result_model import SumResultModel
from app.utils.tl_sum.src.converter.map_county_code_to_state import get_municipio_from_code

from timeit import default_timer as timer

if __name__ == "__main__":
    timer_start = timer()
    
    args = parser.parse_args()
    
    cargos = ['presidente', 'governador', 'senador', 'deputadoFederal', 'deputadoEstadual', 'prefeito']
    estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'ZZ']

    if args.bu_path.is_file():
        f, bus_json = get_json_data_from_file(args.bu_path)
        resultado = soma_votos(bus_json)
        f, bus_json = get_json_data_from_file(args.bu_path)
        resultado_municipio = soma_votos_por_municipio(bus_json)
        f.close()
    elif args.bu_path.is_dir():
        files, bus_json = get_json_data_from_dir(args.bu_path)
        resultado = soma_votos(bus_json)
        files, bus_json = get_json_data_from_dir(args.bu_path)
        resultado_municipio = soma_votos_por_municipio(bus_json)
        for f in files:
            f.close()
    else:
        print("O parâmetro bu_path deve ser um arquivo ou diretório")
        exit(1)

    for estado in estados:
        if estado in resultado_municipio.soma_por_estado:
            for municipio in resultado_municipio.soma_por_estado[estado]:
                for id_eleicao in resultado_municipio.soma_por_estado[estado][municipio]:
                    for cargo in cargos:    
                        if cargo in resultado_municipio.soma_por_estado[estado][municipio][id_eleicao]:
                            municipio_str = get_municipio_from_code(municipio)
                            
                            try:
                                sumResult = SumResultModel(
                                    result=json_str(resultado_municipio.soma_por_estado[estado][municipio][id_eleicao][cargo]),
                                    identifier="{}:{}:{}:{}".format(id_eleicao, cargo, estado, municipio),
                                    id_eleicao= id_eleicao,
                                    cargo=cargo,
                                    estado=estado,
                                    municipio=municipio_str,
                                    municipio_code=municipio
                                )

                                update_or_insert(sumResult) 
                            except:
                                print("O registro já existe no banco de dados")

    for estado in estados:
        if estado in resultado.soma_por_estado:
            for id_eleicao in resultado.soma_por_estado[estado]:

                for cargo in cargos:
                    if cargo in resultado.soma_por_estado[estado][id_eleicao]:
                        try:
                            sumResult = SumResultModel(
                                result=json_str(resultado.soma_por_estado[estado][id_eleicao][cargo]),
                                identifier="{}:{}:{}".format(id_eleicao, cargo, estado),
                                id_eleicao= id_eleicao,
                                cargo=cargo,
                                estado=estado
                            )

                            update_or_insert(sumResult) 
                        except:
                            print("O registro já existe no banco de dados")

            
