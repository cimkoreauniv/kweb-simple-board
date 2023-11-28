const { ArticleDAO } = require("../DAO");

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
    const { user } = req.session;
    const page = parseInt(req.params.page);

    if (!page || page <= 0) throw new Error("BAD_REQUEST");

    const ARTICLES_PER_PAGE = 10;
    const totalPages = Math.ceil(
      (await ArticleDAO.getTotalCount()) / ARTICLES_PER_PAGE
    );
    const articles = await ArticleDAO.getList(
      (page - 1) * ARTICLES_PER_PAGE,
      ARTICLES_PER_PAGE
    );

    return res.render("articles/index.pug", {
      user,
      articles,
      page,
      hasPrev: page > 1,
      hasNext: page < totalPages,
    });
  } catch (err) {
    return next(err);
  }
};

const latestArticles = async (req, res, next) => {
  try {
    return res.redirect("/articles/page/1");
  } catch (err) {
    return next(err);
  }
};

module.exports = { indexPage, listArticles, latestArticles };
