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

// Creating an Action to delete a comment
module.exports.destroy = function(req,res){
    //checking whether the comment is existed in the database
    Comment.findById(req.params.id,function(err,comment){

        if(comment.user == req.user.id){
            // fetching the postID to remove comment id from the comments array inside the postSchema.
            let postId = comment.post;
            comment.remove();
            // deleting the commentId inside the comments array which was deleted.
            Post.findByIdAndUpdate(postId ,{ $pull: {comments: req.params.id} },function(){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }

    });
}