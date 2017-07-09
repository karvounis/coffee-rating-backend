# Web APP API

This repo contains the API of the Web App.
It makes use of mysql and the Loopback JS framework.

In order to set it up:

* Clone the repository
* `docker-compose up -d` will create a mysql container (default port: 6603). 
Will create a hidden folder db/mysql where all the data are going to be stored. 
* `docker build -t <your_name>/loopback_kpn .` will create an image based on the Dockerfile in the root project's folder.
* `docker run -d -p 3000:3000 --link ratedrinksapp_mysql:ratedrinksapp_mysql --net ratedrinksapp_default --name loopback_kpn_backend <your_name>/loopback_kpn /bin/bash -c "node server/create-lb-tables.js; node ."`
This command will generate the loopback js container that is going to serve the API to the port 3000. Instantiates the tables
to the db and then starts the server.
*  The file _server/datasources.json_ contains the db configuration. It is used to connect to mysql.