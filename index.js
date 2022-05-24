const express = require('express');
const app = express();
const port = 8000;

// Working with sass
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

//Reading through the POST requests we have create a midlleware. This is very important. Wasted my whole time,pls dont forget.
app.use(express.urlencoded({extended:true}));

// importing or requiring the database
const db = require('./config/mongoose');

// Used for session cookie.
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// Importing connect-mongo for the persistent storage of our session cookies
//const MongoStore = require('connect-mongo')(session);


// setting up the cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());   // middleware


// Setting up static files.
// Creating a middleware for assets files.
app.use(express.static('./assets'))

//setting up the layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
// extract styles and scripts from sub pages into the layouts.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// adding a middleware which takes in that session_cookie and encrypts it
// session Config
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    // store: new MongoStore(                // mongostore is used to store the session cookie in the db.
    //     {
    //         mongooseConnection : db,
    //         autoRemove : 'disabled'
    //     },function(err){console.log(err);}) 

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// Requiring the library 'connect-flash' for displaying flash-messages.
// middleware has to be set after the session and iam using a custom middleware to and the flash message to the locals of res.
const customMware = require('./config/middleware');
const flash = require('connect-flash');
app.use(flash());
app.use(customMware.setFlash);

// use express router
// Creating a middleware to require the routes index.js
app.use('/',require('./routes/index'));


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);   // We are using interpollation notation `` rather than single quotes ''.

    }
    console.log(`Server is running on port: ${port}`);
});