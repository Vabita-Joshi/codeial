const Post = require('../models/post')
const User = require('../models/users');
const Comment=require('../models/comment')
//create a post
module.exports.create = async function(req, res) {
    try {
      // Make sure the authenticated user is available in req.user
      if (!req.user) {
        return res.status(401).send('Unauthorized'); // 401 - Unauthorized status code
      }
      console.log('User ID:', req.user._id);

      // Create and save the new post
      const newPost = new Post({
        content: req.body.content,
        user: req.user._id
      });
      req.flash('success', 'Post published!');
      
      await newPost.save();
  
      return res.redirect('back');
    } catch (err) {
      console.error('Error:', err);
      req.flash('error', err);
      return res.status(500).send('Internal Server Error');
    }
  };
  
  
// delete  Post

module.exports.destroy = function (req, res) {
  console.log("Post ID to delete:", req.params.id);
  Post.findById(req.params.id)
    .exec()
    .then(post => {
      console.log("Found post:", post);
      // Check if the post is null or undefined
      if (!post) {
        return res.status(404).send("Post not found");
      }

      // Check if the user property is null or undefined
      if (!req.user || !post.user) {
        req.flash('error', 'You cannot delete this post!');
        return res.status(401).send("Unauthorized");
      }

      // Check if the logged-in user is the owner of the post
      if (req.user.id !== post.user.toString()) {
        req.flash('error', 'You cannot delete this post!');
        return res.status(403).send("Forbidden");
      }

      // If all checks pass, proceed with post deletion
      return post.deleteOne(); // Use deleteOne() to delete the post
    })
    .then(() => {
      // Post successfully deleted
      return Comment.deleteMany({ post: req.params.id });
      
    })
    .then(() => {
      req.flash('success', 'Post and associated comments deleted!');

      return res.redirect('back');
    })
    .catch(err => {
      // Handle any errors that occurred during the findById or remove process
      console.error(err);
      return res.redirect('back');
    });
};
