const mongoose  = require("mongoose")
const User = require('../models/users');
module.exports.profile =async function(req,res){
    if (req.cookies.user_id) {
        try {
          const user = await User.findById(req.cookies.user_id)
            .select('name email')
            .exec();
          
          if (user) {
            console.log(user);a
            return res.render('user_profile', {
              title: "UserProfile",
              name: user.name,
              email: user.email
            });
          } else {
            return res.redirect('/users/signin');
          }
        } catch (err) {
          console.error(err);
          return res.redirect('/users/signin');
        }
      } else {
        return res.redirect('/users/signin');
      }
    
    
    }


//render sign up and sign in pages
module.exports.signup =function(req,res){
    // return res.end('<h1>Profile page</h1>');
    return res.render('user-sign-up',{
        title:"signup page"
    })
}
//to render sign in page
module.exports.signin =function(req,res){
    // return res.end('<h1>Profile page</h1>');
    return res.render('user-sign-in',{
        title:"signin page"
    })
    
}









// get the sign-up data
module.exports.create=async function(req,res){
    
    console.log(req.body);

  if (req.body.password !== req.body['confirm-password']) {
    return res.redirect('back');
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      await newUser.save();
      return res.redirect('/users/signin');
    } else {
      return res.redirect('back');
    }
  } catch (error) {
    console.error(error);
    return res.redirect('back');
  }
}




// signin and create a session for the user
module.exports.createSession=async function(req,res){
    
   
        return res.redirect('back');
      

        }