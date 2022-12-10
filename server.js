// Importing Dependencies
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const methodOverride = require("method-override")
const CreatureRouter = require("./controllers/creature");
const LocationRouter = require("./controllers/location");

// Creating application object
const app = express();

// Middleware
app.use(methodOverride("_method"));
app.use(morgan("tiny"));
app.use(express.urlencoded({extended: true}));
app.use("/static", express.static("public"))
app.use("/creatures", CreatureRouter)
app.use("/locations", LocationRouter)

// Routes

// Initial Landing Page
app.get("/", (request, response) => {
    response.render("landingPages/home.ejs")
})

// Index page to decide which specific locations will be shown
app.get("/locationsIndex", (request, response) => {
    response.render("locations/locationLanding.ejs")
})

// App listener
const PORT = process.env.PORT || 3333
app.listen(PORT, (request, response) => {
    console.log(`Listening on port: ${PORT}`)
})






