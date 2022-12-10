const LocationRouter = require("express").Router()
const Location = require("../models/location");
let renderWasUsed = false;


// Ways to deal with errors
function errorCatcher(error, response) {
    renderWasUsed = true;
    response.render("landingPages/error.ejs", {error})
}



// SEED Route
LocationRouter.get("/seed", async (request, response) => {
    await Location.remove({}).catch((error => errorCatcher(error, response)))
    const locations = await Location.create([
        {
            locationName: "Uagadou",
            continent: "Africa",
            location: "Mountains of the Moon, Uganda",
            imageURL: "https://static.wikia.nocookie.net/harrypotter/images/9/98/Uagadou_School_of_Magic.png/revision/latest/scale-to-width-down/350?cb=20160130111544",
            category: "School",
            description: "Uagadou was the African wizarding school, located in the Mountains of the Moon in western Uganda. It was the largest of the eleven wizarding schools, accepting students from all over Africa. Uagadou was founded at least a thousand years before the lifetime of Harry Potter, making it roughly the same age as Hogwarts (perhaps even older). Although a number of smaller wizarding schools could be found throughout Africa, only Uagadou stood the test of time and achieved an enviable international reputation."
        },
        {
            locationName: "Mahoutokoro School of Magic",
            continent: "Asia",
            location: "Japan",
            imageURL: "https://static.wikia.nocookie.net/harrypotter/images/4/4d/MahoutokoroSchoolofMagic.png/revision/latest?cb=20160130112508",
            category: "School",
            description: "Mahoutokoro School of Magic was the only known wizarding school in Asia so far, located in Japan. It was the smallest of the main eleven wizarding schools. It is not known if it accepted students from regional wizarding nations. It is also possible that Koldovstoretz, the Russian wizarding school, was located in Siberia, the Asian part of the country."
        },
        {
            locationName: "Kata Tjuta",
            continent: "Australia",
            location: "approximately 40km west of Uluru",
            imageURL: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Aerial_Kata_Tjuta_olgas4799.jpg",
            category: "Land Mass",
            description: " Kata Tjuṯa / The Olgas form the two major landmarks within the Uluṟu-Kata Tjuṯa National Park. The park is considered sacred to the Aboriginal people of Australia. Last known location of the illusive Billywig"
        },
        {
            locationName: "Magical Congress of the United States of America (MACUSA)",
            continent: "North America",
            location: "Woolworth Building, New York, NY[",
            imageURL: "https://pm1.narvii.com/7022/af652f51b82fae43b4d34812f758debc0bdfae81r4-750-375_00.jpg",
            category: "Government Building",
            description: "The Magical Congress of the United States of America (often abbreviated MACUSA) was the magical body in charge of governing the wizarding community of the United States of America. It was led by the President of the Magical Congress of the United States of America. Unlike the No-Maj (Non-Magic) United States Congress, which is divided into a House of Representatives and a United States Senate, the MACUSA was unicameral. MACUSA performed many of the same functions as other wizarding governing bodies in other countries, such as the Ministries of Magic or Councils of Magic."
        },
        {
            locationName: "Castelobruxo",
            continent: "South America",
            location: "Amazon Rainforest, Brazil, South America",
            imageURL: "https://static.wikia.nocookie.net/harrypotter/images/8/85/CastelobruxoSchoolofMagic.png/revision/latest/scale-to-width-down/350?cb=20161210203310",
            category: "School",
            description: "Castelobruxo was implied to be at least as old as Hogwarts — that is, over a thousand years. This was due to the fact that both castles had been enchanted since their beginnings so they appeared as a ruin to Muggles; it was debated which school first came up with the idea"
        },
        {
            locationName: "House Harry Lived In",
            continent: "Europe",
            location: "4 Privet Drive, Little Whinging, Surrey, England, Great Britain ",
            imageURL: "https://scarepopcom.files.wordpress.com/2016/09/giphy-18.gif?w=332",
            category: "Famous Landmark",
            description: `The Dursleys bought the house and started living in it in 1977. Albus Dumbledore first visited the house in 1981, delivering the baby Harry Potter to be put into the Dursleys care after the murder of his parents Harry wasn't the only thing that Dumbledore left behind him on this occasion: he also invoked strong magic granting Harry absolute protection from Lord Voldemort and his Death Eaters whilst he was at the house, as long as Harry could still call Privet Drive his home, until he came of age on his seventeenth birthday. As it happened, the Order of the Phoenix chose to move Harry to a different safe house — during the famous "Seven Potters" operation — a few days in advance of his seventeenth birthday, after which the magical protection was broken. Before the Order's arrival, however, Vernon Dursley was worried that the plan was actually a cover for a plot by Harry to "get the house". Harry scoffed at this theory, noting "Just in case you've forgotten, I've already got a house". Both Harry's words and his tone of voice silenced his uncle, who couldn't think of a good argument against that`
        },        
        {
            locationName: "Weasleys' Wizard Wheezes",
            continent: "Europe",
            location: "93 Diagon Alley, London, England, Great Britain",
            imageURL: "https://www.universalorlando.com/webdata/k2/en/us/files/Images/gds/usf-weasleys-wizard-wheezes-exterior-b.jpg",
            category: "Business",
            description: "Weasleys' Wizard Wheezes, also known as Weasley & Weasley, was a joke shop located at 93 Diagon Alley founded by Fred and George Weasley.This establishment started out as an 'owl-post service' led by the twins from the Burrow, and later continued from Hogwarts, selling joke-products until the store front was opened. The shop was the Weasley twins' dream. The seed money for the shop was Harry Potter's Triwizard Tournament 1,000 galleon winnings."
        },
        
    ])
    response.json(locations)
})

// Index route for Locations: ~~~ /items ~~~ (GET)
LocationRouter.get("/", async (request, response) => {
    const chosenContinent = request.query.region

    const locations = await Location.find({continent: chosenContinent}).catch((error => errorCatcher(error, response)))

    if (!renderWasUsed) {
        response.render("locations/index.ejs", {locations: locations, chosenContinent: chosenContinent})
    } else {
        renderWasUsed = false;
    }
})

// New route for Locations: ~~~ /items/new ~~~ (GET)
LocationRouter.get("/new", (request, response) => {
    response.render("locations/new.ejs", {chosenContinent: request.query.region})
})

// Destroy route for Locations ~~~ /items/:id ~~~ (DELETE)
LocationRouter.delete("/:id", async (request, response) => {
    await Location.findByIdAndRemove(request.params.id).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.redirect("/locations")
    } else {
        renderWasUsed = false;
    }
})

// Update route for Locations ~~~ /items/:id ~~~ (PUT)
LocationRouter.put("/:id", async (request, response) => {
    request.body.isRare = request.body.isRare ? true : false;
    await Location.findByIdAndUpdate(request.params.id, request.body).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.redirect("/locations")
    } else {
        renderWasUsed = false;
    }
})

// Create route for Locations ~~~ /items ~~~ (POST)
LocationRouter.post("/", async (request, response) => {
    request.body.isRare = request.body.isRare ? true : false;
    const locationAddFunction = await Location.create(request.body).catch((error => errorCatcher(error, response)))

    if (!renderWasUsed) {
        response.redirect("/locations")
    } else {
        renderWasUsed = false;
    }

})

// Edit route for Locations ~~~ /items/:id/edit ~~~ (GET)
LocationRouter.get("/:id/edit", async (request, response) => {
    const location = await Location.findById(request.params.id).catch((error => errorCatcher(error, response)))

    if (!renderWasUsed) {
        response.render("locations/edit.ejs", {location: location, id: request.params.id})
    } else {
        renderWasUsed = false;
    }
})

// Show route for Locations ~~~ /items/:id ~~~ (GET)
LocationRouter.get("/:id", async (request, response) => {
    const location = await Location.findById(request.params.id).catch((error => errorCatcher(error, response)))
    if (!renderWasUsed) {
        response.render("locations/show.ejs", {location: location, id: request.params.id})
    } else {
        renderWasUsed = false;
    }
})

module.exports = LocationRouter