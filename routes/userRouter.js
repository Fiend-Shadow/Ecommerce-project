const express = require('express');
const userRouter = express.Router();

const User = require ("./../models/user");
const Order = require("./../models/order");


userRouter.post('/sign-up', (req, res, next) =>{
  const {userName , password ,  email} = req.body;
    User.create({userName , password ,  email})
    .then((createdUser) => {
      res
      .status(201)
      .json(createdUser);
    }).catch((err) => {
      res
      .status(500)
      .json(err);
    });
});

userRouter.post("/log-in",(req,res,next) => {
  const {email , password} = req.body;

  User.find({email})
  .then((oneUser) => {
    if (password === oneUser.password){
      res
      .status(200)
      .json(oneUser);
    }
    res
    .status(401)
    .json({message: "you have entered a wrong password"});
  }).catch((err) => {
    res
    .status(500)
    .json({message : "your ddont have an account"});
  });
});

userRouter.put("/userProfile/edit",(req,res,next) => {
  const {userName , password , email } = req.body;
  
  User.findOneAndUpdate({email},{userName , password , email},{new:true})
  .then((updatedUser) => {
    res
    .status(200)
    .json(updatedUser);
  }).catch((err) => {
    res
    .status(500)
    .json(err);
  });
});

userRouter.delete("/userProfile/deleteOrder/:orderId",(req,res,next) => {
  const {orderId} = req.params;
  Order.findByIdAndRemove({orderId})
  .then(() => {
    res
    .status(204)
    .send();
  }).catch((err) => {
    res
    .status(500)
    .json(err);
  });  
})
module.exports = userRouter;
