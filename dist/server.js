"use strict";

var express = require('express');
var authRoute = require('./routes/authRoute');
var customerRoute = require('./routes/customerRoute');
var errorMiddleware = require('./middleware/error');
var app = express();
var PORT = 4040;
app.use(express.json());
app.use('/auth', authRoute);
app.use('/customer', customerRoute);
app.get('/', function (req, res) {
  res.json({
    success: true,
    message: "Hello from theoooooo server"
  });
});
app.listen(PORT, function () {
  return console.log("Server is running on port ".concat(PORT));
});
app.use(errorMiddleware);