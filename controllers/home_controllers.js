
const User = require('../models/users');
const Post = require('../models/post');

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .exec();

    const allUsers = await User.find({}).exec();

    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users: allUsers // Pass allUsers to the view
    });
  } catch (err) {
    // Handle the error
    console.error(err);
    return res.status(500).send("An error occurred.");
  }
};
