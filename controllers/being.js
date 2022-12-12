const BeingRouter = require("express").Router()
const Being = require("../models/being");
let renderWasUsed = false;

// Ways to deal with errors
function errorCatcher(error, response) {
    renderWasUsed = true;
    response.json(error)
    // response.render("landingPages/error.ejs", {error: error,})
}

// SEED Route
BeingRouter.get("/seed", async (request, response) => {
    await Being.remove({}).catch((error => errorCatcher(error, response, request)))
    const beings = await Being.create([
        {
            firstName: "Harry",
            lastName: "Potter",
            motherName: "Lily Potter",
            fatherName: "James Potter",
            continent: "Europe",
            affiliations: ["Hogwarts", "Gryffindor", "Student", "Dumbledore's Army"],
            birthPlace: "Godric's Hallow, England",
            imageURL: "https://api.time.com/wp-content/uploads/2014/07/301386_full1.jpg",
            alias: "The Boy Who Lived",
            description: "Harry James Potter was an English half-blood wizard, and one of the most famous wizards of modern times."
        },
        {
            firstName: "Minerv",
            lastName: "McGonagall",
            motherName: "Isobel McGonagall",
            fatherName: "Robert McGonagall",
            continent: "Europe",
            affiliation: ["Hogwarts", "Gryffindor", "Instructor"],
            birthPlace: "Caithness, Scotland, Great Britain",
            imageURL: "https://pbs.twimg.com/media/Di48IyQW0AAGN16.jpg:large",
            alias: "Professor McGonagall",
            description: "Minerva attended Hogwarts School of Witchcraft and Wizardry and was Sorted into Gryffindor House, but it took the Sorting Hat five and a half minutes to decide if she was Gryffindor or Ravenclaw. Minerva McGonagall was an incredibly powerful and talented witch, none should have ever underestimated. Her magical prowess allowed her to be the teacher of Transfiguration, a remarkably complex field of magic which she proved to be an expert in."            
        },
        {
            firstName: "Seraphina",
            lastName: "Picquery",
            motherName: "",
            fatherName: "",
            continent: "NorthAmerica",
            affiliation: ["MACUSA"],
            birthPlace: "Savannah, Georgia, USA",
            imageURL: "https://static.wikia.nocookie.net/harrypotter/images/b/b5/Seraphina-profile.png/revision/latest?cb=20170113010244",
            alias: "President",
            description: "President Seraphina Picquery (fl. 1903–1928) was an American witch born in Savannah, Georgia. She served as the President of the Magical Congress of the United States of America from 1920-1928,[5] proving herself to be a strong and capable leader during her tenure. During her tenure as President, Gellert Grindelwald tried to incite a war between the magical and non-magical communities. He attempted this by attempting to expose the Wizarding world. Also in 1927, Madam Picquery made the Thunderbird a protected species and later extended the law to include all North American beasts. She ended her term as President in 1928."            
        },

    ])
    response.json(beings)
})

// Index route for Beings: ~~~ /items ~~~ (GET)
BeingRouter.get("/", async (request, response) => {
    const chosenContinent = request.query.region
    const beings = await Being.find({continent: chosenContinent}).sort({firstName: 1}).catch((error => errorCatcher(error, response)))

    if (!renderWasUsed) {
        response.render("beings/index.ejs", {beings: beings, chosenContinent: chosenContinent})
    } else {
        renderWasUsed = false;
    }
})

// New route for Beings: ~~~ /items/new ~~~ (GET)
BeingRouter.get("/new", (request, response) => {
    response.render("beings/new.ejs", {chosenContinent: request.query.region})
})

// Destroy route for Beings ~~~ /items/:id ~~~ (DELETE)
BeingRouter.delete("/:id", async (request, response) => {
    await Being.findByIdAndRemove(request.params.id).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.redirect(`/beings?region=${request.query.region}`)
    } else {
        renderWasUsed = false;
    }
})

// Update route for Beings ~~~ /items/:id ~~~ (PUT)
BeingRouter.put("/:id", async (request, response) => {
    request.body.affiliation = request.body.affiliation.split(",");
    await Being.findByIdAndUpdate(request.params.id, request.body).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.redirect(`/beings?region=${request.query.region}`)
    } else {
        renderWasUsed = false;
    }
})

// Create route for Beings ~~~ /items ~~~ (POST)
BeingRouter.post("/", async (request, response) => {
    const beingAddFunction = await Being.create(request.body).catch((error => errorCatcher(error, response)))
    const chosenContinent = request.query.region
    if (!renderWasUsed) {
        response.redirect(`/beings?region=${chosenContinent}`)
    } else {
        renderWasUsed = false;
    }
})

// Edit route for Beings ~~~ /items/:id/edit ~~~ (GET)
BeingRouter.get("/:id/edit", async (request, response) => {
    const being = await Being.findById(request.params.id).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.render("beings/edit.ejs", {being: being, id: request.params.id, chosenContinent: request.query.region})
    } else {
        renderWasUsed = false;
    }
})

// Show route for Beings ~~~ /items/:id ~~~ (GET)
BeingRouter.get("/:id", async (request, response) => {
    const being = await Being.findById(request.params.id).catch((error => errorCatcher(error, response)))
    const chosenContinent = request.query.region
    if (!renderWasUsed) {
        response.render("beings/show.ejs", {being: being, id: request.params.id, chosenContinent: chosenContinent})
    } else {
        renderWasUsed = false;
    }
})

module.exports = BeingRouter