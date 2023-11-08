let Furniture = require('../models/furniture');

// List of all furniture
exports.furniture_list = function(req, res){
    res.send('NOT IMPLEMETED: Furniture list');
}

// Get details for specific item
exports.furniture_detail = function(req, res){
    res.send('NOT IMPLEMETED: Furniture detail' + req.params.id);
}

// Handle furniture create on POST
exports.furniture_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: Furniture create POST');
}

// Handle furniture delete form on DELETE
exports.furniture_delete = function(req, res){
    res.send('NOT IMPLEMENTED: Furniture delete DELETE' + req.params.id);
}

// Handle furniture update form on PUT
exports.furniture_update_put = function(req, res){
    res.send('NOT IMPLEMENTED: Furniture update PUT' + req.params.id);
}
