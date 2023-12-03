const express = require('express');
const app = express();
const port = 8000;
var json = require('express-json');

//including layouts library before routes
const expressLayouts=require('express-ejs-layouts');
//set up database
const db=require('./config/mongoose');

//for passport.js
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-stratergy')
// var MongoStore = require("connect-mongo");



//for set up cookies
const cookieParser= require('cookie-parser');


//changed:parse URL-encoded bodies if u r using form data
app.use(express.urlencoded({extended:true}));
//parse json bodies
app.use(express.json());

//for handling post req
app.use(express.urlencoded());


//not able to perform any operaations  because i am foolplease help me someone
app.use(cookieParser());
//include assets
app.use(express.static('./assets'));

//include layouts
app.use(expressLayouts);

//set the style and script at correct place in layout.ejs
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));
app.set('view engine','ejs');
app.set('views','./views'); 

// for passport.js
app.use(session({
    name: 'codial',
    //todo change scret before deployment
    secret:'changed',
    saveUninitialized: false,
    // store: new MongoStore({mongoUrl: 'mongodb://localhost/codeial_database', }),
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }}

));
app.use(passport.initialize());
app.use(passport.session());

// app.use(session({
//     store: new MongoStore.create({ mongoUrl: 'mongodb://localhost/codeial_database' })
//   }));


app.listen(port, function(err){
    if(err){
        console.log(`error in running the server ${err}`);
    }
    console.log(`Server is running on port ${port}`);
})  