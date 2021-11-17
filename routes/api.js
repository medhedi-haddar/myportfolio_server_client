const express = require('express');
const router = express.Router();
const AboutMe = require('../models/aboutMe');
var ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const { uuid } = require('uuidv4');

const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);      
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
    ,
    onError : function(err, next) {
        console.log('error', err);
        next(err);
      }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf, .png, .jpg and .jpeg a format allowed!'));
        }
    }
});

        
// update about me 
router.post('/update_about_me' ,upload.any(), (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const dataReq = req.body;
    if(req.files[0]){
        dataReq.profileImage = url+'/uploads/'+req.files[0].filename;
    }
    const new_aboutme =  new AboutMe(dataReq);
    console.log(new_aboutme);
    AboutMe.updateOne({_id : dataReq._id},new_aboutme)
    .then((data)=>{
        res.json(data); 
        return true;
    }).catch((error)=>{
        console.log("[ error: send user to database failed ]",error);
        return ({msg : '[ error: send user to database failed ]',error: error.message});
    });
    
});

router.get ('/about_me' , (req, res) => {
    
    AboutMe.find({_id :ObjectId("6192251f60b589380297bdd3")})
    .then((data)=>{
        res.json(data); 
        console.log(data);
    }).catch((error)=>{
        console.log('[ error: send user to database failed ]',error);
    });
    
});
module.exports = router;