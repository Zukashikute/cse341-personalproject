const router = require('express').Router();
const homeRouteController = require('../controllers/');

router.get("/", homeRouteController.homeRoute);

module.exports = router;