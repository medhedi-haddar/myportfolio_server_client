
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const signin = async (req, res)=> {
    
    const { email,password } = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) { return res.status(404).json({messae : "user doesn't exist."});}

        const isPasswordCorrect  = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message : "ivalid credentials"});

        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.TOKEN_SECRET_KEY, { expiresIn : "1h" });
        
        res.status(200).json({ result : existingUser, token });
        
    } catch (error) {
      res.status(500).json({message : "somthing went wrong"});
    }

}

const updateProfile = async (req, res)=> {
    
    const { email,password,firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) { return res.status(404).json({messae : "user doesn't exist."});}

        const isPasswordCorrect  = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message : "ivalid credentials"});

        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.TOKEN_SECRET_KEY, { expiresIn : "1h" });
        
        res.status(200).json({ result : existingUser, token });
        
    } catch (error) {
      res.status(500).json({message : "somthing went wrong"});
    }

}
module.exports = signin;
module.exports = updateProfile;