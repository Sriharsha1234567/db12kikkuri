const mongoose = require("mongoose") 
const snakeSchema = mongoose.Schema({ 
 name: String, 
 color: String, 
 weight: {type:Number,min:15,max:100} 
}) 
 
module.exports = mongoose.model("Snake", snakeSchema) 