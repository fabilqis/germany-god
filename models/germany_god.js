var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var godSchema = new Schema({
    name : String,
    role : String,
    also_known : String,
    description : String
});

var germany_god = mongoose.model("germany_god", godSchema);
module.exports.germany_god = germany_god;