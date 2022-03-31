const express = require("express");
const router = express.Router();
const PUBLISHABLE_KEY = "pk_test_Wl2rlrhGcvRBzUSYmAK7FhSE00nHDHsr3N"


// create an object from the class User in the file core/user.js

// Get the index page
//router.get('/', (req, res, next) => {
  //  let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    //if(user) {
      //  res.redirect('/register');
       // return;
   // }
    // IF not we just send the index page.
   // res.render('register', {title:"My application"});
//})

// Get home page

router.get("/", (req, res) => {
    res.render("Home");
});


router.get("/register", (req, res) => {
    res.render("register");
  });

router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/post-rentals", (req, res) => {
  res.render("post-rentals");
});

router.get("/user-profile", (req, res) => {
  res.render("user-profile");
});

router.get("/immigration", (req, res) => {
  res.render("immigration");
});

router.get("/postrentals", (req, res) => {
  res.render("post-rentals");
});

router.get("/adminregister", (req, res) => {
  res.render("admin-register");
});

router.get("/adminlogin", (req, res) => {
  res.render("admin-login");
});

router.get("/adminuserslist", (req, res) => {
  res.render("admin-users-list");
});

router.get("/adminaddslist", (req, res) => {
  res.render("admin-adds-list");
});

router.get("/adds", (req, res) => {
  res.render("adds");
});

//router.get('/register', (req, res, next) => {
   // let user = req.session.user;

    //if(user) {
    //    res.render('register', {opp:req.session.opp, name:user.fullname});
      //  return;
    //}
    //res.redirect('/');
//});

// Post login data
//router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
  //  user.login(req.body.username, req.body.password, function(result) {
    //    if(result) {
            // Store the user data in a session.
      //      req.session.user = result;
        //    req.session.opp = 1;
            // redirect the user to the home page.
          //  res.redirect('/home');
        //}else {
            // if the login function returns null send this error message back to the user.
          //  res.send('Username/Password incorrect!');
        //}
    //})

//});


// Post register data
//router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
  //  let userInput = {
    //    username: req.body.username,
      //  fullname: req.body.fullname,
        //password: req.body.password
    //};
    // call create function. to create a new user. if there is no error this function will return it's id.
    //user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
      //  if(lastId) {
            // Get the user data by it's id. and store it in a session.
          //  user.find(lastId, function(result) {
            //    req.session.user = result;
              //  req.session.opp = 0;
                //res.redirect('/home');
            //});

        //}else {
          //  console.log('Error creating a new user ...');
        //}
    //});

//});


// Get loggout page
//router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
  //  if(req.session.user) {
        // destroy the session and redirect the user to the index page.
    //    req.session.destroy(function() {
           // res.redirect('/');
      //  });
    //}
//});

module.exports = router;