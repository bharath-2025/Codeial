const express = require('express');
const app = express();
const port = 8000;

// use express router
// Creating a middleware to require the routes index.js
app.use('/',require('./routes/index'));



app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);   // We are using interpollation notation `` rather than single quotes ''.

    }
    console.log(`Server is running on port: ${port}`);
});