import { getDataProof, getTrustedRoot } from '../endpoints/merkletree.api.js';
import { getBuById } from '../endpoints/bu.api.js';
import { initPyodide, formatProofDataToPython } from './pyodide.js';

const ans1= `ModuloBU DEFINITIONS IMPLICIT TAGS ::= BEGIN

EXPORTS ALL;

-- TIPOS
CodigoMunicipio ::= INTEGER (1..99999)          -- Código do município fornecido pelo cadastro da Justiça Eleitoral.
DataHoraJE ::= GeneralString(SIZE(15))          -- Data e hora utilizada pela Justiça Eleitoral no formato YYYYMMDDThhmmss.
IDEleicao ::= INTEGER (0..99999)                -- Código numérico identificador da <glossario id='eleicao'>eleição</glossario> (Atribuído pelo Sistema Configurador de Eleições).
IDPleito ::= INTEGER (0..99999)                 -- Código numérico identificador do <glossario id='pleito'>pleito</glossario> (Atribuído pelo Sistema Configurador de Eleições).
IDProcessoEleitoral ::= INTEGER (0..99999)      -- Código numérico identificador do <glossario id='processo-eleitoral'>processo eleitoral</glossario> (Atribuído pelo Sistema Configurador de Eleções).
NumeroCargoConsultaLivre ::= INTEGER (25..99)   -- Número livre de cargo ou consulta definido no cadastramento da <glossario id='eleicao'>eleição</glossario>.
NumeroInternoUrna ::= INTEGER (0..99999999)     -- Número interno da urna eletrônica.
NumeroLocal ::= INTEGER (1..9999)               -- Número do local de votação da <glossario id='secao-eleitoral'>seção eleitoral</glossario> de acordo com o cadastro da Justiça Eleitoral.
NumeroMesa ::=  INTEGER (1..999)                -- Número da mesa de justificativa de acordo com o cadastro da Justiça Eleitoral (Informação referente ao Número da mesa utilizada para justificativa dos eleitores que não irão votar no seu domicílio eleitoral).
NumeroPartido ::= INTEGER (0..99)               -- Número do <glossario id='partido'>partido</glossario> fornecido pelo Sistema de Candidaturas da Justiça Eleitoral (Número do partido que compõe a <glossario id='coligacao'>coligação</glossario> ou do partido isolado).
NumeroSecao ::= INTEGER (1..9999)               -- Número da <glossario id='secao-eleitoral'>seçõe eleitoral</glossario> de acordo com o cadastro da Justiça Eleitoral.
NumeroSerieFlash ::= OCTET STRING (SIZE(4))     -- Número de série da Flash (Representa um número de 4 bytes (0..2^32-1)).
NumeroUrna ::= INTEGER (1..3)                   -- Número da urna utilizada na mesa de justificativa de acordo com o cadastro da Justiça Eleitoral.
NumeroVotavel ::= INTEGER (0..99999)            -- Número do <glossario id='votavel'>votável</glossario> fornecido pelo Sistema de Candidaturas da Justiça Eleitoral.
NumeroZona ::= INTEGER (1..9999)                -- Número da <glossario id='zona-eleitoral'>zona eleitoral</glossario> fornecido pelo cadastro da Justiça Eleitoral.
QtdEleitores ::= INTEGER (0..9999)              -- Quantidade de <glossario id='eleitor'>eleitores</glossario> aptos de acordo com o cadastro da Justiça Eleitoral.

-- ENUMS
-- Tipos de cargos eletivos previstos na constituição.
CargoConstitucional ::= ENUMERATED {
    presidente              (1),
    vicePresidente          (2),
    governador              (3),
    viceGovernador          (4),
    senador                 (5),
    deputadoFederal         (6),
    deputadoEstadual        (7),
    deputadoDistrital       (8),
    primeiroSuplenteSenador (9),
    segundoSuplenteSenador  (10),
    prefeito                (11),
    vicePrefeito            (12),
    vereador                (13)
}

-- Tipos de fase em que foi gerado os pacotes.
Fase ::= ENUMERATED {
    simulado    (1),    -- Se os arquivos foram gerados durante o simulado.
    oficial     (2),    -- Se os arquivos foram gerados com resultados reais da eleição.
    treinamento (3)     -- Se os arquivos foram gerados durante a fase de treinamento dos sistemas.
}

MotivoApuracaoEletronica ::= ENUMERATED {
    naoFoiPossivelReuperarResultado (1),
    urnaNaoChegouMidiaDefeituosa    (2),
    urnaNaoChegouMidiaExtraviada    (3),
    outros                          (99)
}

MotivoApuracaoManual ::= ENUMERATED {
    urnaComDefeito          (1),
    urnaIndisponivelInicio  (2),
    urnaOutraSecao          (3),
    outros                  (99)
}

MotivoApuracaoMistaComBU ::= ENUMERATED {
    urnaDataHoraIncorreta       (1),
    urnaComDefeito              (2),
    urnaOutrasecao              (3),
    urnaPreparadaIncorretamente (4),
    urnaChegouAposInicioVotacao (5),
    outros                      (99)
}

MotivoApuracaoMistaComMR ::= ENUMERATED {
    naoObteveExitoContingencia          (1),
    indisponibilidadeUrnaContingencia   (2),
    indisponibilidadeFlashContingencia  (3),
    problemaEnergiaEletrica             (4),
    naoFoiPossivelTrocarUrna            (5),
    naoFoiSolicitadaTrocaUrna           (6),
    outros                              (99)
}

TipoApuracao ::= ENUMERATED {
    totalmenteManual        (1),
    totalmenteEletronica    (2),
    mistaBU                 (3),
    mistaMR                 (4)
}

-- Tipos de arquivos de votação.
TipoArquivo ::= ENUMERATED {
    votacaoUE               (1), -- Urna eletrônica.
    votacaoRED              (2), -- RED (Recuperador de Dados - Responsável por gerar uma nova memória de resultado a partir da urna originária).
    saMistaMRParcialCedula  (3), -- <glossario id='sistema-de-apuracao'>Sistema de Apuração</glossario> (Votação Mista - Memória de Resultado e Cédulas).
    saMistaBUImpressoCedula (4), -- <glossario id='sistema-de-apuracao'>Sistema de Apuração</glossario> (Votação Mista - <glossario id='boletim-de-urna'>BU</glossario> impresso e Cédulas).
    saManual                (5), -- <glossario id='sistema-de-apuracao'>Sistema de Apuração</glossario> (Votação totalmente manual - Cédulas).
    saEletronica            (6)  -- <glossario id='sistema-de-apuracao'>Sistema de Apuração</glossario> (Votação totalmente eletrônica).
}

-- Tipos de cargos ou consultas da <glossario id='eleicao'>eleição</glossario>.
TipoCargoConsulta ::= ENUMERATED {
    majoritario     (1), -- <glossario id='cargo-majoritario'>Cargos majoritários</glossario>.
    proporcional    (2), -- <glossario id='cargo-proporcional'>Cargos proporcionais</glossario>.
    consulta        (3)  -- São as perguntas da <glossario id='consulta-popular'>consulta popular</glossario>.
}

-- Tipos de envelopes dos arquivos.
TipoEnvelope ::= ENUMERATED {
    envelopeBoletimUrna         (1), -- Boletim de Urna (BU).
    envelopeRegistroDigitalVoto (2), -- Registro Digital do Voto (RDV).
    envelopeBoletimUrnaImpresso (4), -- Boletim de Urna impresso.
    envelopeImagemBiometria     (5)  -- Arquivo de imagem de biometria.
}

-- Tipos de urna eletrônica.
TipoUrna ::= ENUMERATED {
    secao                   (1), -- Urna de seção.
    contingencia            (3), -- <glossario id='urna-de-contingencia'>Urna de contingência</glossario>.
    reservaSecao            (4), -- Resultado de urna de contingência que passou a ser de seção.
    reservaEncerrandoSecao  (6)  -- Barriga de aluguel para seção (Procedimento de recuperação dos dados de uma urna de seção, a partir da inserção de seu cartão de memória externo em uma <glossario id='urna-de-contingencia'>urna de contingência</glossario>).
}

-- Tipos de votos existentes na urna eletrônica.
TipoVoto ::= ENUMERATED {
    nominal             (1), -- <glossario id='votos-nominais'>Voto nominal.</glossario>
    branco              (2), -- Voto branco.
    nulo                (3), -- Voto nulo.
    legenda             (4), -- <glossario id='votos-de-legenda'>Voto de legenda.</glossario>
    cargoSemCandidato   (5)  -- Nenhum candidato para ser votado no cargo.
}

-- Envelope
-- Entidade responsável por envelopar os arquivos ou dados binários da urna eletrônica.
-- Transforma os arquivos da urna eletrônica em arquivos no padrão ASN.1 assinados e algumas vezes, criptografados.
EntidadeEnvelopeGenerico ::= SEQUENCE {
    cabecalho     CabecalhoEntidade,    -- Informações do cabeçalho da entidade.
    fase          Fase,                 -- Fase em que foi gerado o arquivo.
    urna          Urna OPTIONAL,        -- Informações da urna eletrônica (Deve existir para RDV e ser omitido no BU).
    identificacao IdentificacaoUrna,    -- Identificação se é urna de seção eleitoral ou de Mesa Receptora de Justificativa.
    tipoEnvelope  TipoEnvelope,         -- Tipo de envelope que será criado.
    seguranca     Seguranca OPTIONAL,   -- Informações de segurança solicitados pela biblioteca do CEPESC (Existindo, o conteúdo estará cifrado).
    conteudo      OCTET STRING          -- Conteúdo do envelope gerado.
}

-- Identificador com informações de segurança solicitados pela biblioteca do CEPESC.
Seguranca ::= SEQUENCE {
    idTipoArquivo  INTEGER (0..2),   -- Identificador que corresponde ao arquivo solicitado pela biblioteca do CEPESC.
    idCriptografia INTEGER (1..3),   -- Identificador que corresponde ao Turno solicitado pela biblioteca do CEPESC.
    idArquivoCD    INTEGER (0..255), -- Identificador do arquivo solicitado pela biblioteca do CEPESC.
    idArquivoChave OCTET STRING      -- Chave pública para cifrar o arquivo.
}

-- SEQUENCE RAIZ
-- Entidade responsável por apresentar as informações do <glossario id='boletim-de-urna'>boletim de urna</glossario>.
EntidadeBoletimUrna ::= SEQUENCE {
    cabecalho                   CabecalhoEntidade,                                  -- Informações do cabeçalho da entidade.
    fase                        Fase,                                               -- Fase em que foi gerado o arquivo.
    urna                        Urna,                                               -- Informações da urna eletrônica.
    identificacaoSecao          IdentificacaoSecaoEleitoral,                        -- Informações da <glossario id='secao-eleitoral'>seção eleitoral</glossario> que está instalada a urna eletrônica.
    dataHoraEmissao             DataHoraJE,                                         -- Data e hora da emissão do boletim de urna.
    dadosSecaoSA                DadosSecaoSA,                                       -- Identificação para resultado de urna de seção ou <glossario id='sistema-de-apuracao'>de Sistema de Apuração</glossario>.
    qtdEleitoresLibCodigo       [1] QtdEleitores OPTIONAL,                          -- Quantidade de eleitores que compareceram que foram habilitados manualmente.
    qtdEleitoresCompBiometrico  [2] QtdEleitores OPTIONAL,                          -- Quantidade de eleitores que compareceram que utilizaram <glossario id='identificacao-biometrica'>biometria</glossario>.
    resultadosVotacaoPorEleicao [3] SEQUENCE OF ResultadoVotacaoPorEleicao,         -- Lista com os resultados da votação para cada eleição.
    historicoCorrespondencias   [4] SEQUENCE OF CorrespondenciaResultado OPTIONAL,  -- Lista com informações de histórico das <glossario id='correspondencia'>correspondências</glossario> (Pode ser opcional porque quando o BU é da urna original não existe esse histórico).
    historicoVotoImpresso       [5] SEQUENCE OF HistoricoVotoImpresso OPTIONAL,     -- Lista com informações de histórico de voto impresso.
    chaveAssinaturaVotosVotavel OCTET STRING                                        -- Chave de assinatura pública das tuplas dos votáveis.
}

-- DEMAIS SEQUENCES E CHOICES (ordem alfabética)
ApuracaoEletronica ::= SEQUENCE {
    tipoapuracao    TipoApuracao,
    motivoApuracao  MotivoApuracaoEletronica
}

ApuracaoMistaBUAE ::= SEQUENCE {
    tipoapuracao    TipoApuracao,
    motivoApuracao  MotivoApuracaoMistaComBU
}

ApuracaoMistaMR ::= SEQUENCE {
    tipoApuracao    TipoApuracao,
    motivoApuracao  MotivoApuracaoMistaComMR
}

ApuracaoTotalmenteManualDigitacaoAE ::= SEQUENCE {
    tipoapuracao    TipoApuracao,
    motivoApuracao  MotivoApuracaoManual
}

-- Identificador que contém informações do cabeçalho da entidade (Arquivos ASN.1).
CabecalhoEntidade ::= SEQUENCE {
    dataGeracao DataHoraJE, -- Data da geração da entidade.
    idEleitoral IDEleitoral -- Identificador Eleitoral (<glossario id='processo'>Processo</glossario>, <glossario id='pleito'>pleito</glossario> ou <glossario id='eleicao'>eleição</glossario>).
}

-- Identificador com informações da carga da urna eletrônica.
Carga ::= SEQUENCE {
    numeroInternoUrna   NumeroInternoUrna,  -- Número interno da urna eletrônica.
    numeroSerieFC       NumeroSerieFlash,   -- Número de série da unidade de Flash Card.
    dataHoraCarga       DataHoraJE,         -- Data e hora da carga no formato utilizado pela Justiça Eleitoral (YYYYMMDDThhmmss).
    codigoCarga         GeneralString       -- Código da carga da urna eletrônica.
}

-- Identificador para escolha de Número de cargo constitucional ou Número cargo/consulta livre.
CodigoCargoConsulta ::= CHOICE {
    cargoConstitucional         [1] CargoConstitucional,        -- Cargos constitucionais (São dos cargos previstos na constituição).
    numeroCargoConsultaLivre    [2] NumeroCargoConsultaLivre    -- Código das consultas definido durante o cadastramento da Eleção.
}

-- Identificador com informações da urna e da carga.
CorrespondenciaResultado ::= SEQUENCE {
    identificacao   IdentificacaoUrna,  -- Identificação se  tem carga de seção ou de mesa receptora de justificativa.
    carga           Carga               -- Informações da carga da urna eletrônica.
}

-- Identificador com informações do <glossario id='boletim-de-urna'>BU</glossario>) de <glossario id='sistema-de-apuracao'>SA</glossario>).
DadosSA ::= SEQUENCE {
    juntaApuradora          INTEGER (0..9999),              -- Número da junta eleitoral responsával pela apuração dos votos.
    turmaApuradora          INTEGER (0..9999),              -- Número da turma apuradora responsával pela apuração dos votos.
    numeroInternoUrnaOrigem NumeroInternoUrna OPTIONAL      -- Número interno da urna eletrônica com impossibilidade de utilização.
}

-- Identificador com informações do <glossario id='boletim-de-urna'>BU</glossario>) de seção.
DadosSecao ::= SEQUENCE {
    dataHoraAbertura                    DataHoraJE,         -- Data e hora do início da aquisição do voto (Primeiro voto) no formato adotado pela Justiça Eleitoral (YYYYMMDDThhmmss).
    dataHoraEncerramento                DataHoraJE,         -- Data e hora do término da aquisição do voto (Último voto) no formato adotado pela Justiça Eleitoral (YYYYMMDDThhmmss).
    dataHoraDesligamentoVotoImpresso    DataHoraJE OPTIONAL -- Data e hora do desligamento da impressão do voto (somente se tinha voto impresso na seção e se ocorreu o cancelamento) (YYYYMMDDThhmmss).
}

-- Identificação se é <glossario id='boletim-de-urna'>BU</glossario>) de seção ou BU de <glossario id='sistema-de-apuracao'>SA</glossario>).
DadosSecaoSA ::= CHOICE {
    dadosSecao  [0] DadosSecao, -- BU de Seção.
    dadosSA     [1] DadosSA     -- BU de SA.
}

-- Identificador com informações de histórico de voto impresso
HistoricoVotoImpresso ::= SEQUENCE {
    idImpressoraVotos   INTEGER (0..99999999),  -- Número interno da impressora de votos
    idRepositorioVotos  INTEGER (0..99999999),  -- Número interno do repositório de votos
    dataHoraLigamento   DataHoraJE              -- Data e hora do momento que o dispositivo for ligado
}

-- Tipos de identificadores eleitorais (Se o pacote é gerado por (<glossario id='processo'>processo</glossario>, <glossario id='pleito'>pleito</glossario> ou <glossario id='eleicao'>eleição</glossario>).
IDEleitoral ::= CHOICE {
    idProcessoEleitoral [1] IDProcessoEleitoral,    -- Identificador do <glossario id='processo-eleitoral'>processo eleitoral</glossario>.
    idPleito            [2] IDPleito,               -- Identificador do <glossario id='pleito'>pleito</glossario>.
    idEleicao           [3] IDEleicao               -- Identificador da <glossario id='eleicao'>eleição</glossario>.
}

-- Identificador com informações de <glossario id='contingencia'>contingência</glossario>.
IdentificacaoContingencia ::= SEQUENCE {
    municipioZona MunicipioZona -- Número do município e Número da <glossario id='zona-eleitoral'>zona eleitoral</glossario> a qual pertence a urna.
}

-- Identificador com informações da mesa receptora de justificativa.
IdentificacaoMesaJustificativa ::= SEQUENCE {
    municipioZona   MunicipioZona,  -- Número do município e Número da <glossario id='zona-eleitoral'>zona eleitoral</glossario>.
    mesa            NumeroMesa,     -- Número da mesa de justificativa.
    urna            NumeroUrna      -- Número da urna de justificativa.
}

-- Identificador com informações da <glossario id='secao-eleitoral'>seção eleitoral</glossario>.
IdentificacaoSecaoEleitoral ::= SEQUENCE {
    municipioZona   MunicipioZona,  -- Número do município e Número da <glossario id='zona-eleitoral'>zona eleitoral</glossario> a qual pertence a <glossario id='secao-eleitoral'>seção eleitoral</glossario>.
    local           NumeroLocal,    -- Número do local de votação da seção eleitoral.
    secao           NumeroSecao     -- Número identificador da <glossario id='secao-eleitoral'>seção eleitoral</glossario>.
}

-- Identificação da Urna (Se é de seção eleitoral ou de Mesa Receptora de Justificativa).
IdentificacaoUrna ::= CHOICE {
    identificacaoSecaoEleitoral    [0] IdentificacaoSecaoEleitoral,     -- Urna de seção eleitoral.
    identificacaoContingencia      [1] IdentificacaoContingencia        -- Urna de contingência.
}

-- Identificação de um votável, que pode ser um candidato ou uma pergunta de consulta popular.
IdentificacaoVotavel ::= SEQUENCE {
    partido NumeroPartido,  -- Número do partido.
    codigo  NumeroVotavel   -- Número do votável.
}

-- Identificador que contém informações de município e <glossario id='zona eleitoral'>zona eleitoral</glossario> que são relacionados entre si.
MunicipioZona ::= SEQUENCE {
    municipio   CodigoMunicipio,    -- Código do município de acordo com o cadastro da Justiça Eleitoral.
    zona        NumeroZona          -- Número da <glossario id='zona eleitoral'>zona eleitoral</glossario> de acordo com o cadastro da Justiça Eleitoral.
}

-- Identificador com informações do resultado de votação da urna eletrônica.
ResultadoVotacao ::= SEQUENCE {
    tipoCargo           TipoCargoConsulta,              -- Tipo do cargo ou consulta.
    qtdComparecimento   QtdEleitores,                   -- Quantidade de eleitores que compareceram à seção para votação no cargo ou consulta.
    totaisVotosCargo    SEQUENCE OF TotalVotosCargo     -- Quantidade total de votos para cada cargo ou consulta.
}

-- Estrutura com os resultados da votação de uma eleição.
ResultadoVotacaoPorEleicao ::= SEQUENCE {
    idEleicao           IDEleicao,                      -- Identificador numérico da <glossario id='eleicao'>eleição</glossario>.
    qtdEleitoresAptos   QtdEleitores,                   -- Quantidade de <glossario id='eleitor'>eleitores</glossario> aptos a votar na urna eletrônica da seção.
    resultadosVotacao   SEQUENCE OF ResultadoVotacao    -- Lista com informações do resultado da votação na urna eletrônica.
}

TipoApuracaoSA ::= CHOICE {
    apuracaoMistaMR             [0] ApuracaoMistaMR,
    apuracaoMistaBUAE           [1] ApuracaoMistaBUAE,
    apuracaoTotalmenteManual    [2] ApuracaoTotalmenteManualDigitacaoAE,
    apuracaoEletronica          [3] ApuracaoEletronica
}

-- Identificador com informações do total de votos para cada cargo ou consulta.
TotalVotosCargo ::= SEQUENCE {
    codigoCargo     CodigoCargoConsulta,            -- Código do cargo ou da consulta.
    ordemImpressao  INTEGER(1..99),                 -- Ordem para impressão dos cargos ou consultas no <glossario id='voto-em-transito'>boletim de urna</glossario> e demais relatórios utilizados na Justiça Eleitoral.
    votosVotaveis   SEQUENCE OF TotalVotosVotavel   -- Informações do total de votos agrupados por tipo de voto e número do <glossario id='votavel'>votável</glossario>.
}

-- Identificador com informações da quantidade de votos agrupados por tipo de voto e número do <glossario id='votavel'>votável</glossario>.
TotalVotosVotavel ::= SEQUENCE {
    tipoVoto                [1] TipoVoto,                       -- Tipo do voto.
    quantidadeVotos         [2] QtdEleitores,                   -- Quantidade de votos por tipo e número do votável.
    identificacaoVotavel    [3] IdentificacaoVotavel OPTIONAL,  -- Identificação do votável (Para tipo de voto "Branco" ou "Nulo", esse campo deverá ser omitido).
    assinatura              OCTET STRING                        -- Assinatura dos dados compostos de votos do votável. Os seguintes campos são assinados: TotalVotosCargo::codigoCargo, TotalVotosVotavel::tipoVoto, TotalVotosVotavel::quantidadeVotos, identificacaoVotavel::codigo, identificacaoVotavel::partido, Carga::codigoCarga
}

-- Identificador com informações da urna eletrônica.
Urna ::= SEQUENCE {
    tipoUrna                 TipoUrna,                      -- Tipo da urna eletrônica.
    versaoVotacao            GeneralString,                 -- Versão do software de votação da urna eletrônica.
    correspondenciaResultado CorrespondenciaResultado,      -- Informações da <glossario id='correspondencia'>correspondência</glossario> da urna eletrônica.
    tipoArquivo              TipoArquivo,                   -- Tipo do arquivo gerado pela urna eletrônica.
    numeroSerieFV            NumeroSerieFlash,              -- Número de série da Flash de Votação.
    motivoUtilizacaoSA       TipoApuracaoSA OPTIONAL        -- Identificador numérico para o motivo de utilização do <glossario id='sistema-de-apuracao'>Sistema de Apuração</glossario> para a urna eletrônica.
                                                           -- (UE: não utilizado(0); SA: código de justificativa de uso).
}

END
`
const countyCodes = require('./county_codes.json')

export async function buParser(content) {
    // Retrieve BU metadata

    const pyodide = await initPyodide();
    
    pyodide.FS.writeFile("bu.asn1", ans1, { encoding: "utf8" });

    const pythonCode = `
    import json
    import asn1tools
    from pathlib import Path
    def verify_data():
        #Example function
        conv = asn1tools.compile_files("bu.asn1")
        county_codes = ${JSON.stringify(countyCodes)}

        envelope_decoded = conv.decode("EntidadeEnvelopeGenerico", ${JSON.stringify(content)})

        bu_encoded = envelope_decoded['conteudo']
        bu_decoded = conv.decode('EntidadeBoletimUrna', bu_encoded)

        return str(bu_decoded)


    verify_data()

    `;
    return await pyodide.runPythonAsync(pythonCode);
}
