let express = require('express');
let router = express.Router();

// Require controller modules.
let api_controller = require('../controllers/api');
let furniture_controller = require('../controllers/furniture');

// API Route
router.get('/', api_controller.api);


// Furniture Route

// POST Request for creating Furniture.
router.post('/furniture', furniture_controller.furniture_create_post);

// DELETE Request to delete Furniture
router.delete('/furniture/:id', furniture_controller.furniture_delete);

// PUT request to update Furniture
router.put('/furniture/:id', furniture_controller.furniture_update_put);

// GET request for one piece of Furniture
router.get('/furniture/:id', furniture_controller.furniture_detail);

// GET request for list of all Furniture items
router.get('/furniture', furniture_controller.furniture_list);

module.exports = router;
