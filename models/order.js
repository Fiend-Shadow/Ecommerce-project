const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    orderProducts :[{type: Schema.Types.ObjectId , Ref : "Product"}],
    orderUser : {type: Schema.Types.ObjectId , Ref : "User"},
    isDone : {type:Boolean , required : true},
    time:{
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now}
    }
})

const Order= mongoose.model("Order", orderSchema);
module.exports = Order;