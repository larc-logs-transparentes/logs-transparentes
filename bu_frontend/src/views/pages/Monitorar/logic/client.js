const mqtt = require('mqtt')
const mosquitto_url = require('../../../../config.json').mosquitto_url

/* ---------------------- Configuração mqtt ------------------------- */
const client  = mqtt.connect(mosquitto_url)

client.on('connect', function () {
  client.subscribe('guilherme/teste', {qos: 2}, function (err) {
    if (!err) 
      console.log("Conectado")
  })
})

export default client
