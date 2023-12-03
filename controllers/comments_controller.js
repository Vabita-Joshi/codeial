const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();
      

      res.redirect('/');
    }
  } catch (err) {
    // Handle any errors that might occur during the creation and saving of the comment or post
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (!comment) {
        // Comment with the given ID not found
        return res.status(404).send('Comment not found');
      }

      // Check if the logged-in user is the owner of the comment
      if (comment.user == req.user.id) {
        let postId = comment.post;

        // Remove the comment document
        return comment.deleteOne().then(() => {
          // Update the associated post's 'comments' array
          return Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: req.params.id } }
          );
        });
      } else {
        return res.redirect('back');
      }
    })
    .then(() => {
      // Comment and associated post update were successful
      return res.redirect('back');
    })
    .catch((err) => {
      console.error(err);
      return res.redirect('back');
    });
};
