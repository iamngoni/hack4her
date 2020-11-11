const app = require("./app");
const config = require("./config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function(){
  console.log("API connected to database.")
}).catch(function(error){
  console.log("Could not connect to database: " + error);
});

app.listen(config.port, function(){
  console.log("API listening at http://localhost:"+config.port);
});