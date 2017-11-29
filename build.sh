#!/bin/bash -exu

here=$(cd $(dirname $0); pwd)

function build_frontend_and_backend(){
    local workspace=$here/frontend
    cd $workspace
    npm install
    npm run build

    local workspace=$here/backend
    cd $workspace
    npm install
}

build_frontend_and_backend

docker build -t "foolifish07/letstalk" $here

# Remove unsued docker cache
docker rmi $(docker images -q -f dangling=true) || true