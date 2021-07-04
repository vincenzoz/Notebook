#!/bin/sh -u

main() {
    prepareDevBuild
    startApplication
}

print() {
    textToPrint=$1
    color=`tput setaf 4`
    bold=`tput bold`
    reset=`tput sgr0`
    echo ${color}${bold}$textToPrint${reset}
}

prepareDevBuild() {
    SLEEP_SEC=15
    print "Preparing DEV build"
    npm run build:dev &
    print "Waiting ${SLEEP_SEC} sec for the build to be ready"
    sleep ${SLEEP_SEC}
}

startApplication() {
    print "Run application"
    cd dist
    print " - Serve frontend"
    live-server &
    cd server
    print " - Serve backend"
    node server.js
}

main $@; exit