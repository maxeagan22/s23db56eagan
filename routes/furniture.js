var express = require('express');
const furniture_controllers = require('../controllers/furniture');
var router = express.Router();

// GET furniture
router.get('/', furniture_controllers.furniture_view_all_Page);

module.exports = router;
