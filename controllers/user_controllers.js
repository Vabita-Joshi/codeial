const mongoose  = require("mongoose")
const User = require('../models/users');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the fs module
module.exports.profile = function(req, res) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        // User with the given ID not found
        return res.status(404).send("User not found");
      }

      return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user // Pass the user object to the view
      });
    })
    .catch(err => {
      // Handle the error
      console.error(err);
      return res.status(500).send("An error occurred.");
    });
};

module.exports.update = async function(req, res){
   

  if(req.user.id == req.params.id){

      try{

          let user = await User.findById(req.params.id);
          User.uploadedAvatar(req, res, function(err){
              if (err) {console.log('*****Multer Error: ', err)}
              
              user.name = req.body.name;
              user.email = req.body.email;

              if (req.file){
                console.log(req.file);
                  user.avatar = User.avatarPath + '/' + req.file.filename;
              }
              user.save();
              return res.redirect('back');
          });

      }catch(err){
          req.flash('error', err);
          return res.redirect('back');
      }


  }else{
      req.flash('error', 'Unauthorized!');
      return res.status(401).send('Unauthorized');
  }
}



//render sign up and sign in pages
module.exports.signup =function(req,res){
    
    
    if (req.isAuthenticated()){
      return res.redirect('/users/profile');
  }
    return res.render('user-sign-up',{
        title:"signup page"
    })
}
//to render sign in page
module.exports.signin =function(req,res){
   
    
    if (req.isAuthenticated()){
      return res.redirect('/users/profile');
  }
    return res.render('user-sign-in',{
        title:"signin page"
    })
    
}

// get the sign-up data
// Update the create function to save the avatar path and update the user information
module.exports.create = async function (req, res) {
  console.log(req.body);

  if (req.body.password !== req.body['confirm-password']) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('back');
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    existingUser.name = req.body.name;
    existingUser.email = req.body.email;
    if (req.file) {
      existingUser.avatar = '/uploads/users/avatars/' + req.file.filename; // Store the relative path
    }

    

    await existingUser.save(); // Save the updated user information

    return res.redirect('back');
  } catch (error) {
    req.flash('error', err);
    console.error(error);
    return res.redirect('back');
  }
};

// sign in and create a session for the user
module.exports.createSession = function(req, res){
  req.flash('success','Logged In Succcessfully');
    return res.redirect('/');
}



module.exports.destroySession = function(req, res){
  req.logout(function(err) {
    if (err) {
      console.error('Error during logout:', err);

    }
    req.flash('success','Logged Out Succcessfully');
    return res.redirect('/');
  });
}