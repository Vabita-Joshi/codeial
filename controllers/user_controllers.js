const mongoose  = require("mongoose")
const User = require('../models/users');
module.exports.profile =function(req,res){
    // return res.end('<h1>Profile page</h1>');
    // return res.render('user_profile',{
    //     title:"home"
    // })
    if(req.cookies.user_id){
        var user=User.findById(req.cookies.user_id) 
            if(user){
                return res.render('user_profile',{
                    title:"UserProfile",
                    user:user
                })
            }
            else{
                return res.redirect('/users/sign-in')
            }
    }
     else{
            return res.redirect('/users/sign-in');
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







//get the sign-up data
module.exports.create=function(req,res){
    
    if(req.body.password != req.body.confirm-password){
        return res.redirect('back');
    }

    var user =User.findOne({email:req.body.email});
        if(!user){
           user= User.create(req.body);
                return res.redirect('/users/sign-in');
            
        }
        else{
            return res.redirect('back');
        }
    
}




//signin and create a session for the user
module.exports.createSession=function(req,res){
    //steps to authenticate

    //find the user
    var user=User.findOne({email: req.body.email},{
        password:req.body.password
    } );
        //handle user found
        if(user){

            //handle password doesnt match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile')
            }
        
        else{
            return res.redirect('back');
        }
}
