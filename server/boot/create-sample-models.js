var async = require('async');
module.exports = function(app) {
  //data sources
    var mydb = app.dataSources.dockermysql;

  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    drinks: async.apply(createDrinks),
  }, function(err, results) {
    if (err) throw err;
    createReviews(results.reviewers, results.drinks, function(err) {
      console.log('> reviews created sucessfully');
    });
    createFavourites(results.reviewers, results.drinks, function(err) {
      console.log('> favourites created sucessfully');
    });
  });
  //create reviewers
  function createReviewers(cb) {
    mydb.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'foo@bar.com',
        password: 'foobar'
      }, {
        email: 'john@doe.com',
        password: 'johndoe'
      }, {
        email: 'jane@doe.com',
        password: 'janedoe'
      }], cb);
    });
  }
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
        name: 'Tee Netherlands',
        type: 'tea'
      },{
        name: 'Oud Tea',
        type: 'tea'
      }, ], cb);
    });
  }
  //create reviews
  function createReviews(reviewers, drinks, cb) {
    mydb.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        reviewerId: reviewers[0].id,
        drinkId: drinks[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 3,
        reviewerId: reviewers[1].id,
        drinkId: drinks[0].id,
      },
      {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 4,
        reviewerId: reviewers[3].id,
        drinkId: drinks[3].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 1,
        reviewerId: reviewers[2].id,
        drinkId: drinks[2].id,
      }], cb);
    });
    }
    //create favourites
  function createFavourites(reviewers, drinks, cb) {
    mydb.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([{
        favourited: 1,
        reviewerId: reviewers[0].id,
        drinkId: drinks[0].id,
      }, {
        favourited: 1,
        reviewerId: reviewers[1].id,
        drinkId: drinks[1].id,
      },
      {
        favourited: 1,
        reviewerId: reviewers[3].id,
        drinkId: drinks[2].id,
      }], cb);
    });
  }
};

