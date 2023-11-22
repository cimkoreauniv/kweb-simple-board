const ctrl = require("./ctrl");

const { Router } = require("express");

// '/'
const router = Router();

router.get("/", ctrl.indexPage);

module.exports = router;
