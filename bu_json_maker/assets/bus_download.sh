if ! [ -x "$(command -v wget)" ]; then
  echo 'Error: wget is not installed.' >&2
  exit 1
fi

if ! [ -x "$(command -v unzip)" ]; then
  echo 'Error: unzip is not installed.' >&2
  exit 1
fi

linksToDownload=(
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_1t_AC.zip" 
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_2t_AC.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_1t_AL.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_2t_AL.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_1t_AM.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_2t_AM.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_1t_AP.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_2t_AP.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_1t_BA.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_2t_BA.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_1t_CE.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_2t_CE.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_1t_DF.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_2t_DF.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_1T_ES.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_2T_ES.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_1T_GO.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_2T_GO.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_1T_MA.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_2T_MA.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_1T_MG.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_2T_MG.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_1T_MS.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_2T_MS.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_1T_MT.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_IMGbu_logjez_RDV_VSCMR_2022_2T_MT.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_1t_PA.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgbu_logjez_rdv_vscmr_2022_2t_PA.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgBU_logjez_RDV_VSCMR_2022_1T_PB.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgBU_logjez_RDV_VSCMR_2022_2T_PB.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_1T_PE.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_2T_PE.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_1T_PI.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_2T_PI.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_1T_PR.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_2T_PR.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_1T_RJ.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_2T_RJ.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_1T_RN.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_2T_RN.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_1T_RO.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_2T_RO.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_1T_RR.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_2T_RR.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_1T_RS.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_2T_RS.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_1T_SC.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_2T_SC.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_1T_SE.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_ImgBU_logjez_RDV_VSCMR_2022_2T_SE.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_1T_SP.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_ImgBU_logjez_RDV_VSCMR_2022_2T_SP.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgBU_logjez_RDV_VSCMR_2022_1T_TO.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgBU_logjez_RDV_VSCMR_2022_2T_TO.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/bu_imgBU_logjez_RDV_VSCMR_2022_1T_ZZ.zip"
    "https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2022/arqurnatot/BU_imgBU_logjez_RDV_VSCMR_2022_2T_ZZ.zip")

for link in "${linksToDownload[@]}"
do
    wget $link -P "bus/zips"
done

for file in "bus/zips"/*
do
    unzip $file -d "bus"
done