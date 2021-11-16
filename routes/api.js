const express = require('express');
const router = express.Router();
const AboutMe = require('../models/aboutMe');



router.get ('/about_me' , (req, res) => {
    
    AboutMe.find({})
    .then((data)=>{
        res.json(data); 
        console.log(data);
    }).catch((error)=>{
        console.log('[ error: send user to database failed ]',error);
    });
    
});

// update about me 
router.post ('/update_about_me' , (req, res) => {

    const data = req.body;
    const new_aboutme =  new AboutMe(data);

    new_aboutme.save((error) =>{
        if(error){
            res.status(500).json({msg : "sorry, u-internal server errors",errors : error.message});
            return ;
        }
        
        return res.json({msg : " [ success ] : your data has been saved "})
        
    });
    console.log(req.body);
   res.json({success : "sent successsfuly" })
    
});



module.exports = router;