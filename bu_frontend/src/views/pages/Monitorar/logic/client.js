const mqtt = require('mqtt')

/* ---------------------- Configuração mqtt ------------------------- */
const client  = mqtt.connect('ws://localhost:3030')

client.on('connect', function () {
  client.subscribe('guilherme/teste', {qos: 2}, function (err) {
    if (!err) 
      console.log("Conectado")
  })
})

export default client
