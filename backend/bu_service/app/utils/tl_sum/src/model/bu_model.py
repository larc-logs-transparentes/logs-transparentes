from dataclasses import dataclass

@dataclass
class dados_secao:
    secao: str
    municipio: str
    zona: str


@dataclass
class resultado_candidato_type:
    identificacao_votavel: dict
    quantidade_votos: int
    tipo_voto: str


@dataclass
class resultado_eleicao:
    id_eleicao: str
    resultados: dict[str, dict[str, resultado_candidato_type]]


@dataclass
class resultado_votacao:
    eleicoes: list[resultado_eleicao]


class BU:
    def __init__(self, bu):
        self.identificacao_secao = bu['identificacaoSecao']
        self.municipio_zona = self.identificacao_secao['municipioZona']
        self.resultados_votacao_por_eleicao = bu['resultadosVotacaoPorEleicao']

    def get_dados_secao(self):
        return dados_secao(
            secao=self.identificacao_secao['secao'],
            municipio=self.municipio_zona['municipio'],
            zona=self.municipio_zona['zona']
        )

    def get_resultados_por_eleicao(self):
        resultado_votacao_obj = resultado_votacao(
            eleicoes=[]
        )

        for eleicao in self.resultados_votacao_por_eleicao:
            eleicao_obj = resultado_eleicao(
                id_eleicao=eleicao['idEleicao'],
                resultados={}
            )

            for resultado_votacao_eleicao in eleicao['resultadosVotacao']:
                for resultado_cargo in resultado_votacao_eleicao['totaisVotosCargo']:
                    if (resultado_cargo['codigoCargo'][0] == 'cargoConstitucional'):
                        cargo = resultado_cargo['codigoCargo'][1]  # [0] = tipo de cargo, [1] = nome do cargo
                    else:
                        cargo = f"{resultado_cargo['codigoCargo'][0]}_{resultado_cargo['codigoCargo'][1]}"

                    for resultado_candidato in resultado_cargo['votosVotaveis']:
                        try:
                            votos = resultado_candidato_type(
                                identificacao_votavel=resultado_candidato['identificacaoVotavel'],
                                quantidade_votos=resultado_candidato['quantidadeVotos'],
                                tipo_voto=resultado_candidato['tipoVoto']
                            )
                        except KeyError:  # votos nulos e brancos não tem identificacaoVotavel
                            votos = resultado_candidato_type(
                                identificacao_votavel={'codigo': resultado_candidato['tipoVoto']},
                                quantidade_votos=resultado_candidato['quantidadeVotos'],
                                tipo_voto=resultado_candidato['tipoVoto']
                            )

                        if cargo not in eleicao_obj.resultados:
                            eleicao_obj.resultados[cargo] = {}
                        eleicao_obj.resultados[cargo][votos.identificacao_votavel['codigo']] = votos

            resultado_votacao_obj.eleicoes.append(eleicao_obj)

        return resultado_votacao_obj
