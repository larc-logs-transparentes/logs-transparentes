#RODAR COMO SUDO

pacote=$(apt list mosquitto | grep "instalado") 
if [ "$pacote" = "" ];
then 
    echo "Pacote mosquitto necessario"
    echo "Iniciando instalacao do pacote"
    apt install mosquitto
fi

cfg=$(ls /etc/mosquitto/conf.d | grep "ws.conf")
if [ "$cfg" = "" ];
then
    echo "Configurando broker"
    echo "port 3030\nprotocol websockets\nallow_anonymous true" > /etc/mosquitto/conf.d/ws.conf
fi

mosquitto -v -c /etc/mosquitto/conf.d/ws.conf
exit