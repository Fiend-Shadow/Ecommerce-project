const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName : {type: String , required: true, unique: true} ,
    password : {type: String , required: true},
    email: {type: String , required : true , unique: true}, 
    isAdmin: {type: Boolean , required: true, default: false},
    orders: {type: Schema.Types.ObjectId , Ref: "Order"},
    time:{
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now}
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;