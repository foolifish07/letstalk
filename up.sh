#!/bin/bash -exu

here=$(cd $(dirname $0); pwd)

docker run \
    -p 8080:3000 \
    -v /dev/null:/backend/log \
    "foolifish07/letstalk"
