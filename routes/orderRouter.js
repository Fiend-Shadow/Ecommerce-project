const express = require('express');
const orderRouter = express.Router();

const Product = require("./../models/product");
const User = require ("./../models/user");
const Order = require("./../models/order");


orderRouter.post('/order', function(req, res, next) {
  
});

module.exports = orderRouter;
