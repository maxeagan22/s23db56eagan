var express = require('express');
const furniture_controllers = require('../controllers/furniture');
var router = express.Router();

// GET furniture
router.get('/', furniture_controllers.furniture_view_all_Page);

// GET detail furniture page 
router.get('/detail', furniture_controllers.furniture_view_one_Page);

// GET create furniture page
router.get('/create', furniture_controllers.furniture_create_Page);

// GET create update page
router.get('/update', furniture_controllers.furniture_update_Page);

module.exports = router;
