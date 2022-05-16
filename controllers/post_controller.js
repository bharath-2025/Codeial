const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id        // fetching the identity of the signedIn user that we have created during the passport Authentication
    },function(err,post){
        if(err){console.log("Error in creating a post"); return ;}

        return res.redirect('back');
    });
}

// Creating an Action to delete a post
module.exports.destroy = function(req,res){
    //checking whether the post is existed in the database
    Post.findById(req.params.id,function(err,post){
        //providing a check for authentication of which user to delete a particular post
        if(post.user == req.user.id){
            post.remove();

            // deleting posts will result in deleting all the comments inside that post also. So we are deleting all the comments of that post.
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }

    })
}