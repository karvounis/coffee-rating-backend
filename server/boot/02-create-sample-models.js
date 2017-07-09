var async = require('async');
module.exports = function(app) {
  //data sources
    var mydb = app.dataSources.dockermysql;

  //create all models
  async.parallel({
    // reviewers: async.apply(createReviewers),
    drinks: async.apply(createDrinks)
  }, function(err, results) {
    if (err) throw err;
  });
  //create Drinks
  function createDrinks(cb) {
    mydb.automigrate('Drink', function(err) {
      if (err) return cb(err);
      var Drink = app.models.Drink;
      Drink.create([{
        name: 'Coffee First',
        type: 'coffee'
      }, {
        name: 'Three Coffees',
        type: 'coffee'
      }, {
        name: 'Coffee First',
        type: 'coffee'
      }, {
        name: 'Tee Netherlands',
        type: 'tea'
      },{
        name: 'Oud Tea',
        type: 'tea'
      }, ], cb);
    });
  }
};

