module.exports.profile = function(req,res){
    return res.render('users_profile',{
        title:"Users profile"
    });
}

module.exports.home = function(req,res){
    res.end("<h1>User Home page</h1>")
}