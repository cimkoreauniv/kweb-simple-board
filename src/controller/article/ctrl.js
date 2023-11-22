const { ArticleDAO } = require("../../DAO");

const readArticle = async (req, res, next) => {
  try {
    const { user } = req.session;
    const { articleId } = req.params;
    const article = ArticleDAO.getById(articleId);
    return res.render("articles/details.pug", { user, article });
  } catch (err) {
    return next(err);
  }
};

const writeArticleForm = async (req, res, next) => {
  try {
    const { user } = req.session;
    return res.render("articles/editor.pug", { user });
  } catch (err) {
    return next(err);
  }
};

const writeArticle = async (req, res, next) => {
  try {
    const { user } = req.session;
    const title = req.body.trim();
    const content = req.body.trim();

    if (!title || title.length > 50 || !content || content.length > 65535)
      throw new Error("BAD_REQUEST");

    const articleId = await ArticleDAO.create(title, content, user);
    return res.redirect(`/article/${articleId}`);
  } catch (err) {
    return next(err);
  }
};

const editArticleForm = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

const editArticle = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  readArticle,
  writeArticleForm,
  writeArticle,
  editArticleForm,
  editArticle,
  deleteArticle,
};
