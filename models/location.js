const mongoose = require("./connection");

//Schema for Magical Location

const locationSchema = new mongoose.Schema({
    locationName: {type: String, required: true, unique: true},
    continent: {type: String},
    location: {type: String},
    imageURL: {type: String},
    category: {type: String},
    description: {type: String, required: true}
})

const Location = mongoose.model("Location", locationSchema);

// Exporting model of locations
module.exports = Location;