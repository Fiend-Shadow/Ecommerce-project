const express = require('express');
const orderRouter = express.Router();

const Product = require("./../models/product");
const User = require ("./../models/user");
const Order = require("./../models/order");

/* GET home page. */
orderRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = orderRouter;
