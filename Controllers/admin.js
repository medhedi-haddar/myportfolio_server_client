

const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const signin = async (req, res)=> {
    
    const { email,password } = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) { return res.status(404).json({messae : "user doesn't exist."});}

        const isPasswordCorrect  = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message : "ivalid credentials"});

        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.TOKEN_SECRET_KEY, { expiresIn : "1h" });
        
        existingUser.password = "";
         
        res.status(200).json({ result : {_id: existingUser._id, email: existingUser.email, firstName: existingUser.firstName, lastName: existingUser.lastName }, token });
        
    } catch (error) {
      res.status(500).json({message : "somthing went wrong"});
    }

}
const updateProfile = async (req, res)=> {
    
    const { body } = req;

    try {
        const existingUser = await User.findOne({email : body.email});
  
       
        if(!existingUser) { return res.status(404).json({message : "user doesn't exist."});}

        if(body.newpassword != "") body.password  = await bcrypt.hash(body.newpassword, 12)
        else body.password = existingUser.password; 

        User.updateOne({_id : existingUser._id},body).then((data)=>{
            return res.status(200).json({success : true, message : "profile Updated", data: data});
        }).catch((error) =>{
            return res.status(400).json({success : false, message : error.message});
        })
    } catch (error) {
      return res.status(500).json({message : "somthing went wrong"});
    }
}

module.exports = {signin, updateProfile };