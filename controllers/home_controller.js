module.exports.home = function(req,res){
    return res.end('<h1>Express is UP for Codeial</h1>');
}

module.exports.profile = function(req,res){
    return res.end("Welcome to profile page");
}


// Syntax:
// module.exports.actionName=function(req,res){}