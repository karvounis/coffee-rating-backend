FROM mysql:5.7

ADD my.cnf /etc/mysql/conf.d/my.cnf
ADD startup /etc/mysql/startup

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE=data
ARG MYSQL_ROOT_PASSWORD=root

ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD

RUN sed -i 's/MYSQL_DATABASE/'$MYSQL_DATABASE'/g' /etc/mysql/startup && \
    sed -i 's/MYSQL_USER/'$MYSQL_USER'/g' /etc/mysql/startup && \
    sed -i 's/MYSQL_PASSWORD/'$MYSQL_PASSWORD'/g' /etc/mysql/startup

CMD ["mysqld", "--init-file=/etc/mysql/startup"]
EXPOSE 3306