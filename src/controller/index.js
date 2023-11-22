const ctrl = require("./ctrl");
const auth = require("./auth");

const { Router } = require("express");

// '/'
const router = Router();

router.get("/", ctrl.indexPage);
router.use("/auth", auth);

module.exports = router;
