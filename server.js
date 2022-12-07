// Importing Dependencies
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const methodOverride = require("method-override")
const CreatureRouter = require("./controllers/creature");

// Creating application object
const app = express();

// Middleware
app.use(methodOverride("_method"));
app.use(morgan("tiny"));
app.use(express.urlencoded({extended: true}));
app.use("/static", express.static("public"))
app.use("/creatures", CreatureRouter)

// Routes

app.get("/", (request, response) => {
    response.send(`Successfully reached the Harry Potter Wiki Server`)
})

// App listener
const PORT = process.env.PORT || 3333
app.listen(PORT, (request, response) => {
    console.log(`Listening on port: ${PORT}`)
})






