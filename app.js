var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var dbConfig = require("./config/database");
var logger = require("morgan");
var jwt = require("jsonwebtoken");
var app = express();

mongoose.connect(dbConfig.url);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require("./routes/germany_god")(app);

app.listen(3000);
console.log("listen on port 3000");