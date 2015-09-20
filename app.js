var express = require("express");
var app = express();
var mongoose = require('mongoose');

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://localhost/paintball', options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

//Start server

app.listen(3000, function() {
   console.log("Starting...."); 
});

//Routes load
app.use(require('./routes'));

//www root this could be a route too.
//app.use(express.static("./public"));

