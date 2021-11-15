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
exports.snake_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: snake detail: ' + req.params.id); 
}; 
 
// Handle Costume create on POST. 
exports.snake_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new snake(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"costume_type":"goat", "cost":12, "size":"large"} 
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
exports.snake_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: snake delete DELETE ' + req.params.id); 
}; 
 
// Handle snake update form on PUT. 
exports.snake_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: snake update PUT' + req.params.id); 
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