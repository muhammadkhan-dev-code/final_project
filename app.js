const express= require('express');
const app= express();
const mongoose= require('mongoose');
const Listing = require('./models/listing.js');
const methodOverride = require('method-override');
const ejsMate =require('ejs-mate');

//  setup ejs 
const path = require('path');
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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,"/public")));
//  root api  
app.get("/",(req,res)=>{
  res.send("I am Root ");  
})
//  index route 
 app.get("/listings",async  (req,res)=>{
      const allListings = await Listing.find({});
       res.render('listings/index.ejs',{allListings});
 });
 //  new and create routes 
  app.get("/listings/new",(req,res)=>{
    res.render('listings/new.ejs')
  });
  app.post("/listings",async (req,res)=>{
     const newlisting = new Listing(req.body.listing);// create a new instance of listening and get data from body anf store inside instance
      newlisting.save(); // saved in to data base 
       res.redirect("/listings");
  })
  //  edit and update route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
       const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.render('listings/edit.ejs', { listing });
});
app.put("/listings/:id",async (req,res)=>{
let { id } = req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing});// deconsrtuct the value  ...  ...req.body.listing 
res.redirect(`/listings/${id}`);
})
//  delete route
app.delete("/listings/:id",async(req,res)=>{
  let { id } = req.params;
   let deleted_content= await Listing.findByIdAndDelete(id);
  //  console.log(deleted_content);
   res.redirect("/listings");
})
     //  show route individual listing  data display krna 
  app.get("/listings/:id",async (req,res)=>{
    let {id}= req.params;
      const listing =await Listing.findById(id);
res.render('listings/show.ejs',{listing});
  });
  
app.listen(3000,()=>{
console.log(`Server is Listening to  port 3000`);
});


//  test route
// app.get("/testListeing",async(req,res)=>{
//     let sampleListing= new Listing({
//         title:"My Home",
//         description:"BY The Beach ",
//     price:1200,
//     location:"Beach Karachi ",
//     country:"pakistan"
//     })
//       await sampleListing.save();

//       console.log("Sample Was Saved ..");
//       res.send("Success Full testing");
//      });

