# Web APP API

This repo contains the API of the Web App.
It makes use of mysql and the Loopback JS framework.

In order to set it up:

* Clone the repository
* `docker build -t <mysql_image_name> ./docker_mysql` will build an mysql image.
* `docker run -d -p 6603:3306 -v <path_to_project>/.db/mysql:/var/lib/mysql --name coffeeratingbackend_mysql -eMYSQL_DATABASE=loopback -eMYSQL_ROOT_PASSWORD=root <mysql_image_name>` will create a mysql container exposing port 6603 and database loopback. 
Will create a hidden folder db/mysql where all the data are going to be stored. <path_to_project> is required as docker
expects absolute paths.
* `docker build -t <loopback_image_name> .` will create an image based on the Dockerfile in the root project's folder.
* `docker run -d -p 3000:3000 --link coffeeratingbackend_mysql --name loopback_kpn_backend <loopback_image_name> /bin/bash -c "node server/create-lb-tables.js; node ."`
This command will generate the loopback js container that is going to serve the API to the port 3000. Instantiates the tables
to the db and then starts the server.
*  The file _server/datasources.json_ contains the db configuration. It is used to connect to mysql.
