const ctrl = require("./ctrl");
const auth = require("./auth");
const article = require("./article");

const { Router } = require("express");

// '/'
const router = Router();

router.get("/", ctrl.indexPage);
router.use("/auth", auth);
router.use("/article", article);

module.exports = router;
