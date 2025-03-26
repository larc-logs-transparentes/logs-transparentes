import axios from "axios";

var bu_api_url = `${window.location.protocol}//${window.location.hostname}:8080`

// Obter do arquivo config.json
try {
  var config = await axios.get(`/config.json`)
  bu_api_url = config.data.bu_api_url
}catch (ex){
  console.log(`Não foi possível obter a configuração a partir do arquivo config,json.\n${ex}`)
  console.log(`bu_api_url configurado: ${bu_api_url}`)
}


export default bu_api_url;