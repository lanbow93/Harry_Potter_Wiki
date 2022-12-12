const LandingRouter = require("express").Router()
let renderWasUsed = false;

// Ways to deal with errors MIGHT NOT NEED THIS SECTION IF NO AWAITS USED
function errorCatcher(error, response) {
    renderWasUsed = true;
    response.render("landingPages/error.ejs", {error})
}

// Index page to decide which specific locations will be shown
//  .com/landings
LandingRouter.get("/", (request, response) => {
    response.render("landingPages/locationLanding.ejs")
})

//  .com/submenu
LandingRouter.get("/submenu", (request, response) => {
    response.render("landingPages/submenu.ejs", {currentQuery: request.query})
}) 


module.exports = LandingRouter;