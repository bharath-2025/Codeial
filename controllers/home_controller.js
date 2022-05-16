const Post = require('../models/post');

const User = require('../models/user');

module.exports.home = function(req,res){
    // post.find({},function(err,posts){
    //    return res.render('home',{
    //        title:"HOME PAGE OF POSTS",
    //        posts: posts
    //    });
    // });

    // Populating the user
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){

        User.find({},function(err,users){
            return res.render('home',{
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            })
        })
    })
}




// Syntax:
// module.exports.actionName=function(req,res){}