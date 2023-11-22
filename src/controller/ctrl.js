const indexPage = async (req, res, next) => {
  try {
    const { user } = req.session;
    return res.render("index.pug", { user });
  } catch (err) {
    return next(err);
  }
};

const listArticles = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

module.exports = { indexPage };
