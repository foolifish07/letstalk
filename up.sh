#!/bin/bash -exu

here=$(cd $(dirname $0); pwd)

docker run --rm \
    -p "3000:3000" \
    "foolifish07/letstalk"
