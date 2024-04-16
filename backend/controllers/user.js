const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const signupUser = async(req, res) => {
    try{
        const {
            name,
            email,
            password,
            mobile,
            address,
            aadharNo,
            panNo,
            user_id,
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email is already in use!" });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: passwordHash,
            mobile,
            address,
            aadharNo,
            panNo,
            user_id,
        });
        const savedUser = await User.create(newUser);
        res.status(201).json({ savedUser });
    } 
    catch(err){
        res.status(400).send(err);
    }
};

const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        console.log(user);
        if(!user) {
            return res.status(400).json({ msg: "User does not exist!!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password!!" });
        }
        res.status(200).json({ user });
    }
    catch(err){
        res.status(400).send(err);
    }
};

const logoutUser = async(req, res) => {
    try{
        res.status(200).json({ message: 'Logout successful' });
    }
    catch(err){
        res.status(400).send(err);
    }
};

const getUserDetails = async(req, res) => {
    try{
        const user_id = req.params.userId;
        console.log(user_id);
        const Fetcheddata = await User.findOne({ user_id: user_id});
        console.log(Fetcheddata);
        res.send(Fetcheddata);
    }
    catch(err){
        res.send(err);
    }
};

const updateUserDetails = async(req, res) => {
    
};

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    getUserDetails,
};