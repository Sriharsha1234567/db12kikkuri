var express = require('express'); 
const snake_controlers= require('../controllers/snake'); 
var router = express.Router(); 
 
/* GET costumes */ 
router.get('/', snake_controlers.snake_view_all_Page ); 
module.exports = router; 