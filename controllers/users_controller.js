const User = require('../models/user');


module.exports.profile = function(req,res){
    return res.render('users_profile',{
        title:"Users profile"
    });
}

module.exports.home = function(req,res){
    res.end("<h1>User Home page</h1>")
}

// render the sign-in page
module.exports.signin = function(req,res){
    return res.render('signIn',{
        title: "Sign-In"
    })
}

// render the sign-up page
module.exports.signup = function(req,res){
    return res.render('signup',{
        title:"Sign Up"
    })
}

// get the signUp data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_pass){
        console.log(req.body);
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("error in finding user in signUp");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("error in creating user in signUp");
                    return;
                }
                return res.redirect('/users/signin');
            })
        }
        else{
            return res.redirect('back');
        }
    })

}

// signIn and create a session for the user
module.exports.createSession = function(req,res){
    User.findOne({email:req.body.email,password:req.body.password},function(err,user){
        if(!user){
            return res.redirect('back');
        }

        return res.redirect('/users/profile');
    })
}