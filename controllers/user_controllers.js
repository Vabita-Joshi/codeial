module.exports.profile =function(req,res){
    // return res.end('<h1>Profile page</h1>');
    return res.render('user_profile',{
        title:"home"
    })
}