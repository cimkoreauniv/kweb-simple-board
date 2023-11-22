const { Router } = require("express");
const ctrl = require("./ctrl");
const auth = require("./auth");
const articles = require("./article");

const router = Router();

router.get("/", ctrl.indexPage);
router.get("/articles", ctrl.latestArticles);
router.get("/articles/page/:page(\\d+)", ctrl.listArticles);

router.use("/auth", auth);
router.use("/article", articles);

module.exports = router;
