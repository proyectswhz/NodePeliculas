#!/bin/bash
set -e
mongoimport --username "$MONGO_INITDB_ROOT_USERNAME" --password "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --db NodePeliculas --collection movies --jsonArray --file /docker-entrypoint-initdb.d/peliculas.json
