const { Router } = require("express");
const ctrl = require("./ctrl");

// '/article'
const router = Router();

router.get("/:articleId(\\d+)", ctrl.readArticle);

router.get("/compose", ctrl.writeArticleForm);
router.post("/compose", ctrl.writeArticle);

router.get("/edit/:articleId(\\d+)", ctrl.editArticleForm);
router.post("/edit/:articleId(\\d+)", ctrl.editArticle);

router.get("/delete/:articleId(\\d+)", ctrl.deleteArticle);

module.exports = router;
