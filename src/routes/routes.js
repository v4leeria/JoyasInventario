const express = require("express");
const controller = require("../controllers/controller.js");
const actividad = require("../../utils/registro.js");
const router = express.Router();

router.use(actividad);
router.get("/", controller.queryData);
router.get("/joya/:id", controller.byId);
router.get("/filtros", controller.queryDataFilter);

module.exports = router;
