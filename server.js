/* 
Office Hours:
Author: Bryan Santos
Per Scholas Instructor
Aug 28, 2024 - Wed 

*/

////////////////////////////////////////
// Imports and Variable Declarations //
///////////////////////////////////////

// Importing the Express.js library
const express = require("express");
// Initializing a new instance of an Express server
const app = express();
// Port number our server will run on
const PORT = 3000;

/////////////////////////////////////
// Creating a Template View Engine //
/////////////////////////////////////

// Importing the "fs" node module so that it has access to our file system
const fileSystem = require("fs");

// Creating our very own template engine, giving it a file extension of .perscholas
app.engine("perscholas", (filePath, options, callback) => {
  fileSystem.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);

    return callback(null, rendered);
  });
});

// Telling our Express server where it should look to find our views. Here we're explicitly telling it to check ./views, but that's already where it checks by default just so you know
app.set("views", "./views");

// Telling our Express server the view engine that it'll be using
app.set("view engine", "perscholas");

// A route that will render the 'index.perscholas' template for the user. We also pass in an object that will replace content from the template
app.get("/perscholas", (req, res) => {
  res.render("index.perscholas", {
    title: "I created this template view engine",
    content: "This is being placed into the index.perscholas file",
  });
});

////////////////////////////////////////////
// Using an Existing Template View Engine //
////////////////////////////////////////////

// Install your view engine, ejs in our case: `npm install ejs`

// Telling our Express server the view engine that it'll be using
app.set("view engine", "ejs");

// A route that will render the 'index.ejs' template for the user. We also pass in an object that will replace content from the template
app.get("/ejs", (req, res) => {
  res.render("index.ejs", {
    ejsTitle: "I am using the existing ejs view engine",
    ejsContent: "This is being placed into the index.ejs file",
  });
});

////////////////
// Middleware //
////////////////

// Using middleware that will run for all routes. The order of the middleware matters
app.use((req, res, next) => {
  console.log(
    "This middleware is running for all routes. This one runs first."
  );
  next();
});

app.use((req, res, next) => {
  console.log(
    "This middleware is running for all routes. This one runs second."
  );
  next();
});

// Creating a custom middleware to run for specific routes only
function customMiddleware(req, res, next) {
  console.log("This middleware is running for /user/:id only.");
  next();
}

// Error-handling middleware. They always take four arguments. You must provide four arguments to identify it as an error-handling middleware function
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
  next();
});

////////////
// Routes //
////////////

// Sending text as a response
app.get("/", (req, res) => {
  res.send('The "base" or "home" route of my express server.');
});

// Sending HTML as a response
app.get("/home", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Sending more HTML as a response. Formatted using back-ticks so it's easier to read
app.get("/list", (req, res) => {
  res.send(`
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  `);
  // Same as above, but with quotes it can be harder to read
  // res.send("<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
});

// Redirecting the client to another route
app.get("/go-home", (req, res) => {
  res.redirect("/home");
});

// Utilizing a URL route parameter
// customMiddleware is our middleware for a
// specific route i.e. / user /: id
/*--------- can have multiple middlewares here ------------*/
/* app.get(endpoint, middleware1, middleware2, middleware3, callback) */

app.get("/user/:id", customMiddleware, (req, res) => {
  res.send(`The ID of this user is ${req.params.id}`);
});

// Utilizing a URL route param and query
app.get("/name/:firstName", (req, res) => {
  res.send(`My name is ${req.params.firstName} ${req.query.lastName}`);
});

////////////////////
// Express Router //
////////////////////

// Importing routers into server.js which is our main JS file where everything is configured
const fruitsRouter = require("./routes/fruits");
const vegetablesRouter = require("./routes/vegetables");

// Attaching and associating routers to specific url paths
app.use("/fruits", fruitsRouter);
app.use("/vegetables", vegetablesRouter);

/*
  Now if a client sends a request to a route with /fruits included after the base url, it will check the fruits router for the appropriate response.
  The same thing for vegetables. If a client sends a request to a route with /vegetables included after the base url, it will check the vegetables router.
*/

/////////////////////////
// Starting The Server //
/////////////////////////

app.listen(PORT, () => {
  console.log("Server is running...");
});
