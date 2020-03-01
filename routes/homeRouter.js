const express = require('express');
const homeRouter = express.Router();

const Product = require("./../models/product");
const User = require ("./../models/user");
const Order = require("./../models/order");

/* GET home page. */
homeRouter.get('/', function(req, res, next) {
  let categoriesList = [];
  Product.find()
  .then((allProducts) => {
    allProducts.forEach((oneProduct) => {
      if (categoriesList.indexOf(oneProduct.category) == -1){
        categoriesList.push(oneProduct.category);
      }
      res
      .status(200)
      .json(categoriesList);
    })
  }).catch((err) => {
    res
    .status(500)
    .json(err);
  });
});

homeRouter.post("/productName" , (req,res,next) => {
  const {productName} = req.body;

  Product.find({productName})
  .then((productSearchResult) => {
    res
    .status(200)
    .json(productSearchResult);
  }).catch((err) => {
    res
    .status(500)
    .json(err);
  });
});

homeRouter.post("/category",(req,res,next) => {
  const {category} = req.body;

  Product.find({category})
  .then((productsByCategory) => {
    res
    .status(200)
    .json(productsByCategory);
  }).catch((err) => {
    res
    .status(500)
    .json(err);
  });
})

homeRouter.post("/productNameWFilters", (req,res,next) => {
  const {productName , category , productPrice} = req.body;

  Product.find({productName , category , productPrice})
  .then((productsBySearchWFilters) => {
    res
    .status(200)
    .json(productsBySearchWFilters);
  }).catch((err) => {
    res
    .status(500)
    .json(err);
  });
})
module.exports = homeRouter;

