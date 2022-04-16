// Require the passport and the localStrategy ie passport-local in this case.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import user
const User = require('../models/user');

// We need to tell the passport to use this LocalStrategy
passport.use(new LocalStrategy(
    {
    usernameField: 'email'
    },function(Email,Password,done){
        //Authentication
        //find the user and establish the identity
        User.findOne({email:Email},function(err,user){
            if(err){
                console.log("Error in finding user ---> passport");
                return done(err);
            }
            // if user is not found
            if(!user || user.password != Password){
                console.log("Invalid Username and Password");
                return done(null,false);
            }
            // If user is found
            return done(null,user);
        });
    }

));

// Serializing the user to decide which key to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Deserializing the user from the key in the cookies to get the data of that particular user.

passport.deserializeUser(function(userId,done){
    User.findById(userId,function(err,user){
        if(err){
            console.log("Error in finding user ---> passport");
            return done(err);
        }
        return done(null,user);
    });
});



// check if user is authenticated
// This function is going to be used as a middleware
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/signin');
}

// 
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;


