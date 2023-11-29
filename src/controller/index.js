const ctrl = require("./ctrl");
const auth = require("./auth");
const article = require("./article");

const { Router } = require("express");

// '/'
const router = Router();

router.get("/", ctrl.indexPage);
router.get("/articles/page/:page(\\d+)", ctrl.listArticles);
router.get("/articles", ctrl.latestArticles);
router.use("/auth", auth);
router.use("/article", article);

module.exports = router;
