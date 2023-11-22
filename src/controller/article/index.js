const { Router } = require("express");
const ctrl = require("./ctrl");
const { authRequired } = require("../auth/middleware");

// '/article'
const router = Router();

router.get("/:articleId(\\d+)", ctrl.readArticle);

router.use("/", authRequired);
router.get("/compose", ctrl.writeArticleForm);
router.post("/compose", ctrl.writeArticle);

router.get("/edit/:articleId(\\d+)", ctrl.editArticleForm);
router.post("/edit/:articleId(\\d+)", ctrl.editArticle);

router.get("/delete/:articleId(\\d+)", ctrl.deleteArticle);

module.exports = router;
