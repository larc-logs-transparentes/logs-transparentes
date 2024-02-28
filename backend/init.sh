# verify if mongodb is running
if ! pgrep mongod >/dev/null ;
then
    echo "MongoDB is not running"
    exit 1
fi

# verify if port 8080 is already in use
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "Port 8080 is already in use"

    read -p "Do you want to kill the process? [y/n] " -n 2 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        #kill the process
        kill -9 $(lsof -Pi :8080 -sTCP:LISTEN -t)
    else
        exit 1
    fi
fi

# verify if port 9090 is already in use
if lsof -Pi :9090 -sTCP:LISTEN -t >/dev/null ; then
    echo "Port 9090 is already in use"

    read -p "Do you want to kill the process? [y/n] " -n 2 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        #kill the process
        kill -9 $(lsof -Pi :9090 -sTCP:LISTEN -t)
    else
        exit 1
    fi
fi

# starting public backend
echo "Starting public backend..."
cd public || exit
npm install > /dev/null
npm start > ../public_backend.log &
if [ $? -ne 0 ]; then # if npm start returned a non-zero exit code
    echo "Error starting public backend"
    exit 1
fi
cd ..

# starting private_old backend
echo "Starting private backend..."
cd private_old || exit
npm install > /dev/null
npm start > ../private_backend.log &
if [ $? -ne 0 ]; then # if npm start returned a non-zero exit code
    echo "Error starting private backend"
    exit 1
fi
cd ..

echo

# Feedback
sleep 1 # wait for the servers to start
pid_public=$(lsof -Pi :8080 -sTCP:LISTEN -t)
pid_private=$(lsof -Pi :9090 -sTCP:LISTEN -t)
echo "Public backend running on pid: $pid_public"
echo "Private backend running on pid: $pid_private"