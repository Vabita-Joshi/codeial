const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 8000;
var json = require('express-json');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the fs module
//including layouts library before routes
const expressLayouts=require('express-ejs-layouts');
//set up database
const mongoose = require('mongoose');

app.use(methodOverride('_method'));

//for passport.js
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-stratergy')
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// tostore cookies permannently
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')
const customMware = require('./config/middleware');


//setting up socket.io for chat engine
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening at port 5000");

//for set up cookies
const cookieParser= require('cookie-parser');


//changed:parse URL-encoded bodies if u r using form data
app.use(express.urlencoded({extended:true}));
//parse json bodies
app.use(express.json());

// //for handling post req
// app.use(express.urlencoded());


//not able to perform any operaations  because i am foolplease help me someone
app.use(cookieParser());
//include assets
app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
//include layouts
app.use(expressLayouts);

//set the style and script at correct place in layout.ejs
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views','./views'); 

// for passport.js
app.use(session({
    name: 'codial',
    //todo change scret before deployment
    secret:'changed',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://VabitaJoshi:vab25102002@cluster0.taps3zn.mongodb.net/codeial_database?retryWrites=true&w=majority',
      mongooseConnection: mongoose.connection, // Use your Mongoose connection here
      autoRemove: 'disabled',
  }, function(err){
      console.log(err ||  'connect-mongodb setup ok');
  })

    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//putu after session as it uses session cookies to store flash msg
app.use(flash());   
app.use(customMware.setFlash)
//use express router
app.use('/', require('./routes'));

// app.use(session({
//     store: new MongoStore.create({ mongoUrl: 'mongodb://localhost/codeial_database' })
//   }));




const mongoURI = "mongodb+srv://VabitaJoshi:vab25102002@cluster0.taps3zn.mongodb.net/codeial_database?retryWrites=true&w=majority";
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the MongoDB server.");

  } catch (err) {
    console.error("Error connecting to the MongoDB server:", err);
  }
}
connectToDatabase();









app.listen(port, function(err){
    if(err){
        console.log(`error in running the server ${err}`);
    }
    console.log(`Server is running on port ${port}`);
})  




// https://letstalkk.vercel.app/