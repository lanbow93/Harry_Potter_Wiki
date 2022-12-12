const mongoose = require("./connection");

//Schema for Magical Being

const beingSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    motherName: {type: String},
    fatherName: {type: String},
    continent: {type: String},
    affiliation: {type: Array},
    birthPlace: {type: String},
    imageURL: {type: String},
    alias: {type: String},
    description: {type: String, required: true}
})

const Being = mongoose.model("Being", beingSchema);

// Exporting model of beings
module.exports = Being;