var snake = require('../models/snake'); 
 
// List of all snakes 
exports.snake_list = async function(req, res) { 
    try{ 
        thesnakes = await snake.find(); 
        res.send(thesnakes); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
 
// for a specific snake. 
exports.snake_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await snake.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 
 
 
// Handle snake create on POST. 
exports.snake_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new snake(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"snake_type":"goat", "cost":12, "size":"large"} 
    document.name = req.body.name; 
    document.color = req.body.color; 
    document.weight = req.body.weight; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
  
 
// Handle snake delete form on DELETE.  
exports.snake_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await snake.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
};  
 
// Handle snake update form on PUT. 
exports.snake_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await snake.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.snake_type)  toUpdate.name = req.body.name; 
        if(req.body.color) toUpdate.cost = req.body.color; 
        if(req.body.weight) toUpdate.size = req.body.weight; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 

// VIEWS 
// Handle a show all view 
exports.snake_view_all_Page = async function(req, res) { 
    try{ 
        thesnakes = await snake.find(); 
        res.render('snake', { title: 'snake Search Results', results: thesnakes }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
// Handle a show one view with id specified by query 
exports.snake_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await snake.findById( req.query.id) 
        res.render('snakedetail',  
{ title: 'snake Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 
// Handle building the view for creating a snake. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.snake_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('snakecreate', { title: 'snake Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
};
// Handle building the view for updating a snake. 
// query provides the id 
exports.snake_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await snake.findById(req.query.id) 
        res.render('snakeupdate', { title: 'snake Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
};  