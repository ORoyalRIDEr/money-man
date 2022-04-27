var Article = require("mongoose").model("Article");
var User = require("mongoose").model("User");
var exceptions = require("../../config/exceptions");

module.exports.add = function (req, res, next) {
  // temporary solution: find _id for given id
  if (!req.body.category)
    throw new exceptions.InputException("ArticleCategoryMissing");
  if (!req.body.price)
    throw new exceptions.InputException("ArticlePriceMissing");

  Article.insertMany({
    user: req.user._id,
    time: Date.now(),
    category: req.body.category,
    price: req.body.price,
  });

  res.send();
};

module.exports.delete = function (req, res, next) {
  // Makes sure, that the article fits to the current user
  Article.findOneAndDelete(
    { $and: [{ user: req.user._id }, { _id: req.params.articleId }] },
    function (err, article) {
      try {
        if (err) throw err;
        if (!article)
          throw new exceptions.InputException(
            "ArticleDoesNotExistsForCurrentUser"
          );
        res.send();
      } catch (e) {
        next(e);
      }
    }
  );
};

module.exports.get = function (req, res, next) {
      // extract dates to filter
      var year_s = +req.params.year;
      var month_s = req.params.month ? +req.params.month : 0;
      var day_s = req.params.day ? +req.params.day : 1;
      var year_e = req.params.month ? year_s : year_s + 1;
      var month_e = req.params.month
        ? req.params.day
          ? month_s
          : month_s + 1
        : 0;
      var day_e = req.params.day ? day_s + 1 : 1;

      var date_s = new Date(year_s, month_s, day_s);
      var date_e = new Date(year_e, month_e, day_e);

      var conditions = [
        { user: req.user._id },
        /*{ time: date_s },*/
        { time: { $gte: date_s } },
        { time: { $lt: date_e } },
      ];

      Article.find(
        { $and: conditions },
        function (err, articles) {
          if (err) throw err;
          if (!articles) {
            res.send();
          } else {
            var output = articles.map(function (art) {
              return {
                id: art._id,
                time: art.time,
                category: art.category,
                price: art.price,
              };
            });
            res.send(output);
          }
        },
        { multi: true }
      );
};

module.exports.firstEntry = function (req, res, next) {
  Article.find({ user: req.user._id })
    .sort({ time: 1 })
    .limit(1)
    .then((articles) => {
      if (articles[0])
        res.send(articles[0].time);
      else
        res.send();
    });
};

module.exports.getCategories = function (req, res, next) {
  Article.find({ user: req.user._id }).then(
    (articles) => {
      let categories = articles.reduce((cats, art) => {
        if (!cats.includes(art.category)) cats.push(art.category);
        return cats;
      }, []);

      res.send(categories);
    },
    { multi: true }
  );
};

module.exports.convertArticle = function (req, res, next) {
  Article.find(
    {},
    function (err, articles) {
      articles.forEach(function (art) {
        // Convert user
        if (Number.isInteger(art.user)) {
          User.findOne({ id: art.user })
            .exec()
            .then(function (user) {
              console.log(`${art._id} => ${user.name}, ${user._id}`);
              Article.findOneAndUpdate(
                { _id: art._id },
                {
                  user: user._id,
                }
              ).exec();
            });
        }

        // Convert time stamp and price
        Article.findOneAndUpdate(
          { _id: art._id },
          {
            time: new Date(art.time),
            price: +art.price,
          }
        ).exec();
      });
    },
    { multi: true }
  );
};
