// require mongoose after npm install mongoose
const mongoose = require('mongoose');

// connect to localhost development zone
mongoose.connect('mongodb://localhost/codeial_development');
// Establishing the connection
const db = mongoose.connection;


// Error handling
db.on('error',console.error.bind(console,"Error in connection to MongoDB"));
db.once('open',function(){
    console.log("Connected to database :: MOngoDB");
})



// Exporting database, so that it can be accessed in index.js
module.exports = db;