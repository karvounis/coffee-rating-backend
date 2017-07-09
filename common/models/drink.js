'use strict';

module.exports = function(Drink) {
  Drink.averages = function(cb) {
    var ds = Drink.dataSource;
    var sql = 'SELECT AVG(Rating.rating) AS average,Drink.id AS drinkId FROM Drink ' +
        'LEFT OUTER JOIN Rating ON Rating.drinkId = Drink.id GROUP BY Drink.id';
    ds.connector.query(sql, function(err, products) {
      if (err) console.error(err);
      cb(err, products);
    });
  };
  Drink.remoteMethod(
        'averages', {
          http: {
            path: '/averages',
            verb: 'get',
          },
          returns: {
            arg: 'data',
            type: 'string',
          },
        }
    );
};
