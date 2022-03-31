const express = require('express');
const database = require("./src/helpers/database");
const models = require("./src/models");
const cors = require("cors");
const path = require('path');
const fileUpload = require("express-fileupload");
const controllers = require("./src/controllers");
const app = express();
const port = 3000;


// for body parser. to collect data that sent from the client.
//app.use(express.urlencoded( { extended : false}));


// Serve static files. CSS, Images, JS files ... etc
//app.use(express.static(path.join(__dirname, 'public')));

database.afterSync(() => {
    console.log(models);
    console.log("Tables synced successfully");
  });




// Template engine. PUG
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));



Object.keys(controllers).forEach((controller) => {
    app.use(controllers[controller]);
});



 //session
//app.use(session({
  //  secret:'youtube_video',
    //resave: false,
    //saveUninitialized: false,
    //cookie: {
      // maxAge: 60 * 1000 * 30
    //}
//}));


// Routers



// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('it will not work');
    err.status = 404;
    next(err);
})

// Handling errors (send them to the client)
//app.use((err, req, res, next) => {
  //  res.status(err.status || 500);
    //res.send(err.message);
//});

// Setting up the server
app.listen(port, () => console.log(`App listening on port ${port}!`));


