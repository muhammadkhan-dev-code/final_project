const mongoose= require('mongoose');
const init_data = require('./data');
const Listing = require('../models/listing');

//  setup database  connection 
const MONGO_URL= 'mongodb://127.0.0.1:27017/wander_lust';
main().then(()=>{
    console.log("connectd to DataBase");
}).catch(err=>
    {
    console.log(err);
})

 async function main() {
    await  mongoose.connect(MONGO_URL);
 }

 const init_DB= async ()=>{
    //  if the data already so clean the data base 
 await Listing.deleteMany({});
//   and add new Data in data base 
 await Listing.insertMany(init_data.data);
 console.log("Data Was initialized ")
 }

 init_DB();