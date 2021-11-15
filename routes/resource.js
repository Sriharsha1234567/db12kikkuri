var express = require('express'); 
var router = express.Router(); 
 
// Require controller modules. 
var api_controller = require('../controllers/api'); 
var snake_controller = require('../controllers/snake'); 
 
/// API ROUTE /// 
 
// GET resources base. 
router.get('/', api_controller.api); 
 
/// snake ROUTES /// 
 
// POST request for creating a snake.  
router.post('/snake', snake_controller.snake_create_post); 
 
// DELETE request to delete snake. 
router.delete('/snake/:id', snake_controller.snake_delete); 
 
// PUT request to update snake. 
router.put('/snake/:id', 
snake_controller.snake_update_put); 
 
// GET request for one snake. 
router.get('/snake/:id', snake_controller.snake_detail); 
 
// GET request for list of all snake items. 
router.get('/snake', snake_controller.snake_list); 
 
module.exports = router;