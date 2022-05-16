const post = require('../models/post');

module.exports.home = function(req,res){
    // post.find({},function(err,posts){
    //    return res.render('home',{
    //        title:"HOME PAGE OF POSTS",
    //        posts: posts
    //    });
    // });

    // Populating the user
    post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
        })
    })
}




// Syntax:
// module.exports.actionName=function(req,res){}