const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");
const connectDB = require("./database/connect");
const Equipment=require('./Schema/EquipmentSchema');
const Crop=require('./Schema/CropSchema');
const Fertilizer=require('./Schema/FertilizersSchema');
const Cattle=require('./Schema/CattleSchema');
const axios = require('axios');
const fs=require('fs');

const port = process.env.PORT || 5000;

app.use(express.json());
app.get('/getEquipment',async (req,res)=>{
   

  try{
    const Fetcheddata=await Equipment.find();
    res.send(Fetcheddata);
  }
  catch(err){
      res.send(err);
  }
     
})
app.post('/postEquipment',async (req,res)=>{
     try{
      const RecievedData=new Equipment(req.body);
      const data=await RecievedData.save();
      res.send(data);
     }
     catch(err){
      res.send(err);
     }
})
app.get('/getCrop',async (req,res)=>{
   

  try{
    const Fetcheddata=await Crop.find();
    res.send(Fetcheddata);
  }
  catch(err){
      res.send(err);
  }
     
})

app.post('/postCrop',async (req,res)=>{
     try{
      const RecievedData=new Crop(req.body);
      const data=await RecievedData.save();
      res.send(data);
     }
     catch(err){
      res.send(err);
     }
})
app.get('/getFertilizer',async (req,res)=>{
   

  try{
    const Fetcheddata=await Fertilizer.find();
    res.send(Fetcheddata);
  }
  catch(err){
      res.send(err);
  }
     
})


app.get('/api/locations', (req, res) => {
  console.log(req.query);
  let {lat,lon}=req.query;
  lat=Number(lat);
  lon=Number(lon);
  lat=lat.toFixed(4);
  lat=parseFloat(lat);
  lon=lon.toFixed(4);
  lon=parseFloat(lon);
  fs.readFile('locations.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      else{
        let ObjData=JSON.parse(data);
        let arrayData=ObjData.locations;
        let minValue=1000;
        let DataItem={};
        let location='';
        arrayData.map((item)=>{
          if(minValue>(Math.min(minValue,Math.abs(item.latitude-lat) +Math.abs(item.longitude-lon)))){

            minValue=Math.min(minValue,Math.abs(item.latitude-lat) +Math.abs(item.longitude-lon));
            DataItem=item;


          }
          
        })
        console.log(minValue);
        res.send({price: DataItem.price_estimate_per_sqft.average,location:DataItem.location});
      }
  });
});




app.get('/getlocation', async (req, res) => {
  const { lat, lon } = req.body;
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&zoom=10&format=json`);
    const importance = response.data.importance;
    const rank=response.data.place_rank;
    const placeName=response.data.address;
    const type=response.data.type;
    res.send({ placeName,importance,rank,type });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/postFertilizer',async (req,res)=>{
     try{
      const RecievedData=new Fertilizer(req.body);
      const data=await RecievedData.save();
      res.send(data);
     }
     catch(err){
      res.send(err);
     }
})

app.get('/getCattle',async (req,res)=>{
   

  try{
    const Fetcheddata=await Cattle.find();
    res.send(Fetcheddata);
  }
  catch(err){
      res.send(err);
  }
     
})

app.post('/postCattle',async (req,res)=>{
     try{
      const RecievedData=new Cattle(req.body);
      const data=await RecievedData.save();
      res.send(data);
     }
     catch(err){
      res.send(err);
     }
})

app.delete('/deleteEquipment',async (req,res)=>{
  const data=await Equipment.deleteOne({_id:"65f2c67bc044943d61b82d5e"});
  res.send(data);
})

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connection established successfully...");
    app.listen(port, console.log(`Server started on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

startServer();