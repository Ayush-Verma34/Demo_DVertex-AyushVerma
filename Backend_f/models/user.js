const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password:{
        type:String,
        required:true,
        match:/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        minlength:8
    },

},)

module.exports = mongoose.model("User", userSchema);