const mongoose = require("mongoose") 
const costumeSchema = mongoose.Schema({ 
 name: String, 
 color: String, 
 weight: Number 
}) 
 
module.exports = mongoose.model("Costume", 
costumeSchema) 