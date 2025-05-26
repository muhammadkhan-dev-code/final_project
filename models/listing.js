const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//  define schema 
const ListingSchema= new Schema({
    title:{
        type : String,
        required:true,
    },
    description:{
        type : String
    },
    image: {
    type: String,
    required: true,
    default: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
}
,
    price :{
        type: Number
    },
    location:{
        type : String
    },
    country:{
        type : String
    },
});
//  create a model
 const Listing= mongoose.model("Listing",ListingSchema);

//   export module
module.exports= Listing;

