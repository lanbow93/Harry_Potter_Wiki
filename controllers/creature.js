const CreatureRouter = require("express").Router()
const Creature = require("../models/creature");

// Ways to deal with errors
function errorCatcher(error, response) {
    response.json(error)
}

// SEED Route
CreatureRouter.get("/seed", async (request, response) => {
    await Creature.remove({}).catch((error => errorCatcher(error, response)))
    const creatures = await Creature.create([
        {
            creatureName: "Acromantula",
            creatureLocation: "Island of Borneo",
            ministryClassification: "XXXXX",
            imageURL: "http://kaiju.wdfiles.com/local--files/wiki:aragog/aragog_2002_01.jpg",
            isRare: true,
            description: "An Acromantula was a giant magical species of spider native to the rainforests of Southeast Asia, particularly Borneo, where it inhabited dense jungles. Acromantulas sported eight black eyes (white if blind) and were typically covered in thick black hair, with a leg span that could reach up to fifteen feet. On average, they were the size of a carthorse, though old specimens such as Aragog could grow up to 15 feet in leg span."
        },
        {
            creatureName: "Pixie",
            creatureLocation: "Cornwall, England",
            ministryClassification: "XXX",
            imageURL: "https://pm1.narvii.com/6817/a6b4fa8847cfedc2c7b8aea95efd55298ce19645v2_hq.jpg",
            isRare: false,
            description: "The Pixie was able to fly, and enjoyed lifting people up by their ears and depositing them on the tops of trees and buildings, showing incredible strength for creatures of their tiny size. It could also steal things. In Cornwall in the 17th century, Dymphna Furmage, a witch on holiday, was abducted by Pixies. This led to a lifelong fear of them, which drove her to request that the British Ministry of Magic humanely eradicate the pixie species. Her request was declined, and she died in 1692."
        },
    ])
    response.json(creatures)
})

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