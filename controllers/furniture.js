let Furniture = require('../models/furniture');

// List of all furniture
exports.furniture_list = async function(req, res){
    try{
        theFurniture = await Furniture.find();
        res.send(theFurniture);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Get details for specific furniture item
exports.furniture_detail = async function(req,res){
    console.log("Detail " + req.params.id);
    try{
        result = await Furniture.findById(req.params.id);
        res.send(result);
    }catch(error){
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found}`);
    }
};

// Handle furniture create on POST
exports.furniture_create_post = async function(req,res){
    console.log(req.body);
    let document = new Furniture();
    
    // We are looking for a body since POST does not have a query
    // We want a json object
    document.name = req.body.name;
    document.finish = req.body.finish;
    document.price = req.body.price;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{error: ${err}}`);
    }

};

// Handle furniture delete form on DELETE
exports.furniture_delete = async function(req, res){
    console.log('Delete ' + req.params.id);
    try{
        result = await Furniture.findByIdAndDelete(req.params.id);
        console.log('Removed ' + result);
        res.send(result);
    }catch(err){
        res.status(500);
        res.send(`{error: Error deleting ${err}}`);
    }
};

// Handle furniture update form on PUT
exports.furniture_update_put = async function(req, res){
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try{
        let toUpdate = await Furniture.findById(req.params.id);
        // Do update of properties
        if(req.body.furniture_type){
            toUpdate.furniture_type = req.body.furniture_type;
        }
        if(req.body.finish){
            toUpdate.finish = req.body.finish; 
        }
        if(req.body.price){
            toUpdate.price = req.body.price;
        }

        // Handle Checkbox 
        if(req.body.checkboxsale){
            toUpdate.sale = true; 
        }
        else{
            toUpdate.sale = false; 
        }

        // Get results 
        let result = await toUpdate.save();
        console.log('Sucess ' + result);
        res.send(result);
    }catch(err){
        res.status(500);
        res.send(`{error: ${err}: Update for id ${req.params.id} failed}`);
    }
};

// Views 
// Handle a show all view
exports.furniture_view_all_Page = async function(req, res){
    try{
        theFurniture = await Furniture.find();
        res.render('furniture', { title: 'Furniture Search Results', results: theFurniture });
    }
    catch(err){
        res.status(500);
        res.send(`{'error': ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.furniture_view_one_Page = async function(req, res){
    console.log('Single view for id ' + req.query.id);
    try{
        result = await Furniture.findById(req.query.id);
        res.render('furnituredetail', {title: 'Furniture Detail', toShow: result });
    }catch(err){
        res.status(500);
        res.send(`{'Error': '${err}'}`);
    }
};

// Handle building view for creating a piece of furniture
exports.furniture_create_Page = function(req, res){
    console.log('Create view');
    try{
        res.render('furniturecreate',{title: 'Furniture Create'});
    }catch(err){
        res.status(500);
        res.send(`{Error': '${err}'}`);
    }
};

// Handle building view for updating a piece of furniture
exports.furniture_update_Page = async function(req, res){
    console.log('Update view for item ' + req.query.id);
    try{
        let result = await Furniture.findById(req.query.id);
        res.render('furnitureupdate', {title: 'Furniture Update', toShow:result});
    }catch(err){
        res.status(500);
        res.send(`{Error': '${err}'}`);
    }
};

// Handle a delete one view page with id
exports.furniture_delete_Page = async function(req,res){
    console.log('Delete view for id ' + req.query.id);
    try{
        result = await Furniture.findById(req.query.id);
        res.render('furnituredelete', {title: 'Furniture Delete',toShow:result});
    }catch(err){
        res.status(500);
        res.send(`{Error: '${err}'}`);
    }
};

//
