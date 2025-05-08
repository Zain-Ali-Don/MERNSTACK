let mongoose= require('mongoose');
 let user_collection = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    record_at:{
        type:Date,
        default:Date.now
    }

 })

 module.exports = mongoose.model("User_tbl", user_collection)