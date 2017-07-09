var server = require('./server');
var ds = server.dataSources.dockermysql;
var lbTables = ['User', 'Reviewer', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Rating', 'Favourite'];
ds.automigrate(lbTables, function (er) {
    if (er) throw er;
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
    ds.disconnect();
});

