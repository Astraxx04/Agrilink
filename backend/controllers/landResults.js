const LandResults = require("../models/LandResultsSchema");

const postLandResult = async(req, res) => {
    try{
        const RecievedData = new LandResults(req.body);
        const data = await RecievedData.save();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
};

const getAllLandResults = async(req, res) => {
    try{
        const Fetcheddata = await LandResults.find();
        res.send(Fetcheddata);
    }
    catch(err){
        res.send(err);
    }   
};

module.exports = {
    postLandResult,
    getAllLandResults,
};