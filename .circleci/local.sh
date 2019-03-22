#!/usr/bin/env bash

function run () {
    local tkn=$1

    res=$(
        curl --user ${tkn}: \
          --request POST \
          --form config=@config.yml \
          --form notify=false \
          https://circleci.com/api/v1.1/project/github/o-sydorenko/backframe/tree/master
    )

    echo "${res}"
}

run $1
