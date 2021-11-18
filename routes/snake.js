var express = require('express'); 
const snake_controlers= require('../controllers/snake'); 
var router = express.Router(); 
 
/* GET snakes */ 
router.get('/', snake_controlers.snake_view_all_Page ); 
/* GET detail snake page */ 
router.get('/detail', snake_controlers.snake_view_one_Page); 
/* GET create snake page */ 
router.get('/create', snake_controlers.snake_create_Page);
/* GET create update page */ 
router.get('/update', snake_controlers.snake_update_Page);  
module.exports = router; 