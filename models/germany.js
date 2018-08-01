var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var saltRounds = 12

const godSchema = new Schema({
    name: String,
    role: String,
    also_known: String,
    description: String,
    username : String,
    email : String,
    password : String
});

let Germany = mongoose.model("germany_god", godSchema, "germany_god", true);
module.exports.Germany = Germany;