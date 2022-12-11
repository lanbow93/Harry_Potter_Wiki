const mongoose = require("./connection");

//Schema for Magical Creature

const creatureSchema = new mongoose.Schema({
    creatureName: {type: String, required: true, unique: true},
    creatureLocation: {type: String},
    ministryClassification: {type: String, required: true},
    imageURL: {type: String},
    isRare: {type: Boolean},
    description: {type: String, required: true},
    continent: {type: String}
})

const Creature = mongoose.model("Creature", creatureSchema);

// Exporting model of creatures
module.exports = Creature;