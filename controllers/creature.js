const CreatureRouter = require("express").Router()

// Ways to deal with errors
function errorCatcher(error, res) {
    res.json(error)
}

CreatureRouter.get("/", (request, response) => {
    response.send("made it to the Creature router")
})


module.exports = CreatureRouter