const mongoose  = require("mongoose")
const User = require('../models/users');
module.exports.profile =function(req,res){
    // return res.end('<h1>Profile page</h1>');
    return res.render('user_profile',{
        title:"home"
    })
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

//get the sign-up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm-password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log("error in signup");return;}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log("error in signup");return;}
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}