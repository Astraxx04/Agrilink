const Equipment = require('../models/EquipmentSchema');
const Crop = require('../models/CropSchema');
const Fertilizer = require('../models/FertilizersSchema');
const Cattle = require('../models/CattleSchema');

const getEquipment = async(req, res) => {
    try{
        const Fetcheddata = await Equipment.find();
        res.send(Fetcheddata);
    }
    catch(err){
        res.send(err);
    }
};

const postEquipment = async(req,res)=>{
    try{
        const RecievedData = new Equipment(req.body);
        const data = await RecievedData.save();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
};

const getCrop = async (req,res)=>{
    try{
        const Fetcheddata = await Crop.find();
        res.send(Fetcheddata);
    }
    catch(err){
        res.send(err);
    }     
};

const postCrop = async (req,res)=>{
    try{
        const RecievedData = new Crop(req.body);
        const data = await RecievedData.save();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
};

const getFertilizer = async(req,res)=>{
    try{
      const Fetcheddata = await Fertilizer.find();
      res.send(Fetcheddata);
    }
    catch(err){
        res.send(err);
    }
};

const postFertilizer = async(req,res)=>{
    try{
        const RecievedData = new Fertilizer(req.body);
        const data = await RecievedData.save();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
};

const getCattle = async (req,res)=>{
    try{
      const Fetcheddata = await Cattle.find();
      res.send(Fetcheddata);
    }
    catch(err){
        res.send(err);
    }     
};

const postCattle = async (req,res)=>{
    try{
        const RecievedData = new Cattle(req.body);
        const data = await RecievedData.save();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
};

module.exports = {
    getEquipment,
    postEquipment,
    getCrop,
    postCrop,
    getFertilizer,
    postFertilizer,
    getCattle,
    postCattle,
};