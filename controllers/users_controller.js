module.exports.profile = function(req,res){
    res.end("<h1>User Profile</h1>")
}

module.exports.home = function(req,res){
    return res.render('users_home',{
        title:"Users Home"
    });
}