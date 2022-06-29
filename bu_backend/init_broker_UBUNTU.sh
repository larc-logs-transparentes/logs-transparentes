#RODAR COMO SUDO
#Definir porta como parâmetro do sh. Senão, porta padrão é a 3030
#Ex: sudo ./init_broker_UBUNTU.sh 3060

if [ "$1" = "" ];
then
    port="3030"
else
    port=$1
fi

pacote=$(apt list mosquitto | grep "instalado") 
if [ "$pacote" = "" ];
then 
    echo "Pacote mosquitto necessario"
    echo "Iniciando instalacao do pacote"
    apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
    apt-get update
    apt install mosquitto
fi

cfg=$(ls /etc/mosquitto/conf.d | grep "ws.conf")
if [ "$cfg" = "" ];
then
    echo "Configurando broker"
    echo "listener ${port}\nprotocol websockets\nallow_anonymous true" > /etc/mosquitto/conf.d/ws.conf
else
    aux=$(cat /etc/mosquitto/conf.d/ws.conf | grep ${port})
    if [ "$aux" = "" ];
    then
        echo "Alterando porta anteriomente configurada"
        echo "listener ${port}\nprotocol websockets\nallow_anonymous true" > /etc/mosquitto/conf.d/ws.conf
    fi
fi

mosquitto -v -c /etc/mosquitto/conf.d/ws.conf
exit