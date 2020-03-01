const express = require('express');
const adminRouter = express.Router();

const Product = require("./../models/product");
const User = require ("./../models/user");



//checking if admin to let the user (add, edit and delete products)
function checkIfAdmin (id , response){
    User.findById({id})
    .then((adminUser) => {
        if (adminUser.isAdmin){
            return true;
        }
        response
        .status(400)
        .json({message : "You are not an admin"});
        return false;
    }).catch((err) => {
        response.status(500).json({message : err});
    });
}

/* GET home page. */
adminRouter.post('/:userId/products', function(req, res, next) {
  const {productName , description , quantity , productPrice , category ,  img_url} = req.body;
  const {userId} = req.params;
  if (checkIfAdmin(userId , res)) return;


  Product.create({productName , description , quantity , productPrice , category , img_url})
  .then((createdProduct) => {
      res
      .status(201)
      .json(createdProduct);
  }).catch((err) => {
      res
      .status(500)
      .json(err);
  });
});

adminRouter.put ("/:userId/products/:productId", (req,res,next) => {
    const {productName , description , quantity , productPrice , category , img_url} = req.body;
    const {userId, productId} = req.params;
    if (checkIfAdmin(userId , res)) return;

    Product.findByIdAndUpdate({productId},{productName , description , quantity , productPrice , category , img_url})
    .then(() => {
        res
        .status(200)
        .json({message : "product updated"})
    }).catch((err) => {
        res
        .status(500)
        .json(err)     
    });    
});

adminRouter.delete("/:userId/products/:productId", (req,res,next) => {
    const {userId, productId} = req.params;
    if (checkIfAdmin(userId , res)) return;

    Product.findByIdAndRemove({productId})
    .then(() => {
        res.status(204).send()
    }).catch((err) => {
        res.status(500).json(err);
    });
})

module.exports = adminRouter;
