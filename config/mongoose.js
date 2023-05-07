const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_database');


const db=mongoose.connection;

db.on('error',console.error.bind(console,"error in running database"));

db.once('open',function(){
    console.log("Connected to database:MOngodb");
});

module.exports= db;