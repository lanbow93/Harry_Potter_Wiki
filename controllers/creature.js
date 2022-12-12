const CreatureRouter = require("express").Router()
const Creature = require("../models/creature");
let renderWasUsed = false;

// Ways to deal with errors
function errorCatcher(error, response) {
    renderWasUsed = true;
    response.render("landingPages/error.ejs", {error})
}

// Index route for Creatures: ~~~ /items ~~~ (GET)
CreatureRouter.get("/", async (request, response) => {
    const chosenContinent = request.query.region
    const creatures = await Creature.find({continent: request.query.region}).sort({creatureName: 1}).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.render("creatures/index.ejs", {creatures: creatures, chosenContinent: chosenContinent})
    } else {
        renderWasUsed = false;
    }
})

// New route for Creatures: ~~~ /items/new ~~~ (GET)
CreatureRouter.get("/new", (request, response) => {
    response.render("creatures/new.ejs",{chosenContinent: request.query.region})
})

// Destroy route for Creatures ~~~ /items/:id ~~~ (DELETE)
CreatureRouter.delete("/:id", async (request, response) => {
    await Creature.findByIdAndRemove(request.params.id).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.redirect(`/creatures?region=${request.query.region}`)
    } else {
        renderWasUsed = false;
    }
})

// Update route for Creatures ~~~ /items/:id ~~~ (PUT)
CreatureRouter.put("/:id", async (request, response) => {
    request.body.isRare = request.body.isRare ? true : false;
    await Creature.findByIdAndUpdate(request.params.id, request.body).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.redirect(`/creatures?region=${request.query.region}`)
    } else {
        renderWasUsed = false;
    }
})

// Create route for Creatures ~~~ /items ~~~ (POST)
CreatureRouter.post("/", async (request, response) => {
    request.body.isRare = request.body.isRare ? true : false;
    const creatureAddFunction = await Creature.create(request.body).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.redirect(`/creatures?region=${request.body.continent}`)
    } else {
        renderWasUsed = false;
    }

})

// Edit route for Creatures ~~~ /items/:id/edit ~~~ (GET)
CreatureRouter.get("/:id/edit", async (request, response) => {
    const creature = await Creature.findById(request.params.id).catch((error => errorCatcher(error, response)))

    if (!renderWasUsed) {
        response.render("creatures/edit.ejs", {creature: creature, id: request.params.id, chosenContinent: request.query.region})
    } else {
        renderWasUsed = false;
    }
})

// Show route for Creatures ~~~ /items/:id ~~~ (GET)
CreatureRouter.get("/:id", async (request, response) => {
    const creature = await Creature.findById(request.params.id).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.render("creatures/show.ejs", {creature: creature, id: request.params.id, chosenContinent: request.query.region})
    } else {
        renderWasUsed = false;
    }
})

module.exports = CreatureRouter