const express = require('express');
const app = express();
const port = 8000;


//including layouts library before routes
const expressLayouts=require('express-ejs-layouts');
//set up database
const db=require('./config/mongoose');

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


app.listen(port, function(err){
    if(err){
        console.log(`error in running the server ${err}`);
    }
    console.log(`Server is running on port ${port}`);
})  