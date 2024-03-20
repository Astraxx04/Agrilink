const CropResults = require("../models/CropResultsSchema");

const postCropResult = async(req, res) => {
    try{
        const RecievedData = new CropResults(req.body);
        const data = await RecievedData.save();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
};

const getAllCropResults = async(req, res) => {
    try{
        const Fetcheddata = await CropResults.find();
        res.send(Fetcheddata);
    }
    catch(err){
        res.send(err);
    }   
};

module.exports = {
    postCropResult,
    getAllCropResults,
};