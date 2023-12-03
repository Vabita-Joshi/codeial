const mongoose = require('mongoose');

// mongoose.connect('mongodb://vabita-joshi2510:vabita-joshi2510@mongodb/codeial_database?directConnection=true');




// db.on('error',console.error.bind(console,"error in running database"));

// db.once('open',function(){
//     console.log("Connected to database:MOngodb");
// });
const mongoURI = "mongodb://127.0.0.1:27017/codeial_database";
const db=mongoose.connection;
async function connectToDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
    });
  } catch (err) {
    console.error("Error connecting to the MongoDB server:", err);
  }
}
    console.log("Connected to the MongoDB server.");


module.exports= db;



