const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();


const mongoose = require("mongoose");
const cors = require("cors");

const homeRouter = require('./routes/homeRouter');
const productRouter = require("./routes/productRouter");
const orderRouter =require("./routes/orderRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");


const app = express();


// MONGOOSE CONNECTION
mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// CORS SETTINGS (MIDDLEWARE) TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"] // <== this will be the URL of our React app (it will be running on port 3000)
}));
//  ...


app.use('/api', homeRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', userRouter);
app.use ("/api" , adminRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
