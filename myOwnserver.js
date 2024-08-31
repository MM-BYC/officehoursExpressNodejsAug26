const express = require("express");
// ----> This imports our npm package names express
const app = express();
// ----> this represents express being called()..[ie:func()] and converted to the keyword app, which we will use to talk to our server/express Connection.

// ------------------------------------------[ROUTES --> HTTP --> (req,res)]

app.get("/", (req, res) => {
  res.send(
    "Hey I am data, that was requested from the server...on this specific route: ROOT"
  );
});
// ------------[GET ---> ROOT]

app.get("/home", (req, res) => {
  res.render("Homepage");
});
// ------------[GET ---> ROOT]

app.get("/about", (req, res) => {
  res.send("ABOUT");
});
// ------------[GET ---> ROOT]

app.get("/contact", (req, res) => {
  res.send("CONTACT");
});
// ------------[GET ---> ROOT]

app.listen("3000", () => {
  console.log("Server is now running");
});
// ---> LISTENS for requests to the server, and passes off the request to the routingSystem, to find the results of the requested data.
