const express = require('express');
const app = express();
const port = 8000;

//setting up the layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
// extract styles and scripts from sub pages into the layouts.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// Setting up static files.
// Creating a middleware for assets files.
app.use(express.static('./assets'))

// use express router
// Creating a middleware to require the routes index.js
app.use('/',require('./routes/index'));

// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);   // We are using interpollation notation `` rather than single quotes ''.

    }
    console.log(`Server is running on port: ${port}`);
});