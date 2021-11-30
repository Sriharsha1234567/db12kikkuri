var express = require('express'); 
const snake_controlers= require('../controllers/snake'); 
var router = express.Router(); 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 
 
/* GET snakes */ 
router.get('/', snake_controlers.snake_view_all_Page ); 
/* GET detail snake page */ 
router.get('/detail', snake_controlers.snake_view_one_Page); 
/* GET create snake page */ 
router.get('/create',secured, snake_controlers.snake_create_Page);
/* GET create update page */ 
router.get('/update',secured, snake_controlers.snake_update_Page); 
/* GET create snake page */ 
router.get('/delete',secured, snake_controlers.snake_delete_Page); 
module.exports = router; 