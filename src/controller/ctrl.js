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
    const ARTICLES_PER_PAGE = 10;
    const page = parseInt(req.params.page);
    const { user } = req.session;
    if (page <= 0) throw new Error("BAD_REQUEST");

    const start = (page - 1) * ARTICLES_PER_PAGE;
    const articles = await ArticleDAO.getList(start, ARTICLES_PER_PAGE);
    const pageCount = Math.ceil(
      (await ArticleDAO.getTotalCount()) / ARTICLES_PER_PAGE
    );
    return res.render("articles/index.pug", {
      user,
      articles,
      page,
      hasPrev: page > 1,
      hasNext: page < pageCount,
    });
  } catch (err) {
    return next(err);
  }
};

const latestArticles = async (req, res, next) => {
  try {
    res.redirect("/articles/page/1");
  } catch (err) {
    return next(err);
  }
};

module.exports = { indexPage, listArticles, latestArticles };
