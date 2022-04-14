module.exports.home = function(req,res){
    return res.render('home',{
        title:"Home"
    });
}




// Syntax:
// module.exports.actionName=function(req,res){}