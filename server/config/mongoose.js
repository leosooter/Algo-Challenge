const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const modelsPath = path.join(__dirname, "../models");
const regEx = new RegExp(".js$", "i");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/algos_db', function(){
  //mongoose.connection.db.dropDatabase();
});

mongoose.connection.on( 'connected', function () {
  console.log( 'Database connected' );
});

mongoose.connection.on( 'disconnected', function () {
  console.log( 'Database disconnected' );
});

process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});

fs.readdirSync(modelsPath).forEach(function(file){
  if(regEx.test(file)){
    require(path.join(modelsPath, file));
  }
});
