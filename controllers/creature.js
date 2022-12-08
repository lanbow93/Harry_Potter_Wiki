const CreatureRouter = require("express").Router()
const Creature = require("../models/creature");

// Ways to deal with errors
function errorCatcher(error, response) {
    response.json(error)
}

// Index route for Creatures: ~~~ /items ~~~ (GET)
CreatureRouter.get("/", async (request, response) => {
    const creatures = await Creature.find({}).catch((error => errorCatcher(error, response)))
    response.render("creatures/index.ejs", {creatures})
})

// New route for Creatures: ~~~ /items/new ~~~ (GET)
CreatureRouter.get("/new", (request, response) => {
    response.render("creatures/new.ejs")
})

// Destroy route for Creatures ~~~ /items/:id ~~~ (DELETE)
CreatureRouter.delete("/:id", async (request, response) => {
    await Creature.findByIdAndRemove(request.params.id).catch((error => errorCatcher(error, response)))
    response.redirect("/creatures")
})

// Update route for Creatures ~~~ /items/:id ~~~ (PUT)
CreatureRouter.put("/:id", async (request, response) => {
    request.body.isRare = request.body.isRare ? true : false;
    await Creature.findByIdAndUpdate(request.params.id, request.body).catch((error => errorCatcher(error, response)))
    response.redirect("/creatures")
})

// Create route for Creatures ~~~ /items ~~~ (POST)
CreatureRouter.post("/", async (request, response) => {
    request.body.isRare = request.body.isRare ? true : false;
    await Creature.create(request.body).catch((error => errorCatcher(error, response)))
    response.redirect("/creatures")
})

// Edit route for Creatures ~~~ /items/:id/edit ~~~ (GET)
CreatureRouter.get("/:id/edit", async (request, response) => {
    const creature = await Creature.findById(request.params.id).catch((error => errorCatcher(error, response)))
    response.render("creatures/edit.ejs", {creature: creature, id: request.params.id})
})

// Show route for Creatures ~~~ /items/:id ~~~ (GET)
CreatureRouter.get("/:id", async (request, response) => {
    const creature = await Creature.findById(request.params.id).catch((error => errorCatcher(error, response)))
    response.render("creatures/show.ejs", {creature: creature, id: request.params.id})
})

module.exports = CreatureRouter