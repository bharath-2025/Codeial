const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    console.log("Error in creating commenting");
                    return;
                }
                //updating the comments array and every time after updating we have to call the save() function available in mongoose to save the updated value.
                post.comments.push(comment);
                post.save();

                res.redirect('back');
            })
        }
    })
}