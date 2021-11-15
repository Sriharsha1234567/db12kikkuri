const mongoose = require("mongoose") 
const snakeSchema = mongoose.Schema({ 
 name: String, 
 color: String, 
 weight: Number 
}) 
 
module.exports = mongoose.model("Snake", snakeSchema) 