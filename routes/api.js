const express = require('express');
const fs = require('fs')
const router = express.Router();
const AboutMe = require('../models/aboutMe');
const Media = require('../models/media');
const Skills = require('../models/skills');
const Skillitem = require('../models/skillitem');
const Project = require('../models/project');
const Experience = require('../models/experience');
const User = require('../models/user');
const UserSession = require('../models/userSession');
var jwt = require('jsonwebtoken');

var ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const DIR = './uploads/';

router.get('/about_me' , (req, res) => {
    
    AboutMe.find().populate(['cv','profileImage'])
    .then((data)=>{
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    }); 
});

router.get('/skills' , (req, res) => {
    
    Skills.find().populate('skills')
    .then((data)=>{
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    }); 
});

router.get('/projects' , (req, res) => {
    
    Project.find().populate('cover')
    .then((data)=>{
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    }); 
});

router.get('/project/:id' , (req, res) => {
    const id =req.params.id;
    Project.findById({_id:id}).populate('cover')
    .then((data)=>{
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    }); 
});

/*----------------------------------------------------------------
// EXPERIENCEE CRUD
----------------------------------------------------------------*/
router.get('/experiences',(req,res)=>{
     
    Experience.find()
    .then((data)=>{
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    }); 

});

router.post('/add_experience', async (req,res)=>{

    let dataReq = req.body;
    console.log(dataReq);
    const newExperience = new Experience(dataReq);
    await newExperience.save().then((data)=>{  
        console.log(data);     
    }).catch((error)=>{
     console.log(error.message)
     });
});

router.post('/update_experience', async (req,res)=>{

    let dataReq = req.body;
    const new_project = new Experience(dataReq);
    Experience.updateOne({_id : dataReq._id},new_project)
    .then((data)=>{
        res.json(data);
        return true;
    }).catch((error)=>{
        console.log("[ error: update Experience me ]",error.message);
        return ({msg : '[ error-aboutme : send data to database failed ]',error: error.message});
    });
 
 });
 
router.post('/delete_experience/:id',async(req,res)=>{
    
    const id =req.params.id;

    await Experience.deleteOne({_id:id})
    .then((data)=>{
        res.status(200).json({success: true, message: data});
    })
    .catch((error)=>{
        res.status(400).json({success: false, message: error.message});
    }); 
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);      
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
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
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg+xml"  || file.mimetype == "image/gif"  || file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf, .png, .jpg and .jpeg a format allowed!'));
        }
    }
});

router.post('/add_project' , upload.any(), async (req, res) => {
  
    // const url = req.protocol + '://' + req.get('host');
    const dataReq = req.body;

    if(req.files[0]){
        let mediaReq = {
            title : dataReq.title,
            description  : "project_cover",
            url : ''
        }
        mediaReq.url = '/uploads/'+req.files[0].filename;
        const new_media =  new Media(mediaReq);
        dataReq.cover = new_media;
        new_media.save();
    }

    const new_project =  new Project(dataReq);
    new_project.save().then((data)=>{
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    });
    
});

router.post('/update_project', upload.any(), async (req,res)=>{

    const dataReq = req.body;
    const preventProject = await Project.findById({_id: dataReq._id}).populate('cover');
    if(req.files[0]){
      
        if(preventProject.cover._id){
            if (fs.existsSync('.'+preventProject.cover.url)){
                fs.unlink('.'+preventProject.cover.url, (err) => {
                    if (err) {
                        console.error(err)  
                    }
                });
            }
        }
        let mediaReq = {
            _id :preventProject.cover._id,
            title : dataReq.title,
            description  : "project_cover",
            url : ''
        }
        mediaReq.url = '/uploads/'+req.files[0].filename;
        const new_media =  new Media(mediaReq);
        Media.updateOne({_id : preventProject.cover._id},new_media)
        .then((data)=>{
            console.log(data);
        }).catch((error)=>{
            console.log("[ error: update file profileImage ]",error.message);
            
        });
    }
    
    const new_project = new Project(dataReq);
    Project.updateOne({_id : dataReq._id},new_project)
    .then((data)=>{
        res.json(data);
        return true;
    }).catch((error)=>{
        console.log("[ error: update Project me ]",error.message);
        return ({msg : '[ error-aboutme : send data to database failed ]',error: error.message});
    });
});

router.post('/delete_project/:id',async(req,res)=>{
    
    const id =req.params.id;
    const project_instance = await Project.findById({_id : id}).populate('cover');

    await Project.deleteOne({_id: project_instance._id})
    .then((data)=>{
        Media.deleteOne({_id: project_instance.cover._id})
        .then((data)=>{
            if (fs.existsSync('.'+project_instance.cover.url)){
                fs.unlink('.'+project_instance.cover.url, (err) => {
                    if (err) {
                        console.error(err)  
                    }
                });
            }
            res.status(200).json({success: true, message: data});
        })
        .catch((error)=>{
            res.status(400).json({success: false, message: error.message});
        });
        res.status(200).json({success: true, message: data});
    })
    .catch((error)=>{
        res.status(400).json({success: false, message: error.message});
    }); 
});


router.post('/add_about_me' , upload.any(), async (req, res) => {
    // const url = req.protocol + '://' + req.get('host');
    const dataReq = req.body;
    if(req.files[0]){
        let mediaReq = {
            title : "cv",
            description  : "cv .pdf",
            url : ''
        }
        mediaReq.url = '/uploads/'+req.files[0].filename;
        const new_media =  new Media(mediaReq);
        dataReq.cv = new_media;
        new_media.save();
    }
    if(req.files[1]){
        let mediaReq = {
            title : "image de profile",
            description  : "image de profile",
            url : ''
        }
        mediaReq.url = '/uploads/'+req.files[1].filename;
        const new_media =  new Media(mediaReq);
        dataReq.profileImage = new_media;
        new_media.save();
    } 

    const new_aboutme =  new AboutMe(dataReq);
    new_aboutme.save().then((data) => {
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    });
})

router.post('/update_about_me' ,upload.any(), async (req, res) => {
    // const url = req.protocol + '://' + req.get('host');
    const dataReq = req.body;
    const preventAboutMe = await AboutMe.findById({_id: dataReq._id});

     // save image profile
     req.files.map( async (file)=>{
        if(file.fieldname === 'profileImage'){

            const profileImageReq = {
                title : "profileImage",
                description  : "description profileImage",
                url : ''
            }
            profileImageReq.url = '/uploads/'+file.filename;
            dataReq.profileImage = profileImageReq;
            
            if(preventAboutMe.profileImage ){
                const preventProfileImage = await Media.findById({_id: preventAboutMe.profileImage});
    
                if (fs.existsSync('.'+preventProfileImage.url)){
                    fs.unlink('.'+preventProfileImage.url, (err) => {
                        if (err) {
                            console.error(err)  
                        }
                    });
                }
                preventProfileImage.url = '/uploads/'+file.filename;
                const new_media = new Media(preventProfileImage)
                Media.updateOne({_id : preventProfileImage._id},new_media)
                .then((data)=>{
                    console.log(data);
                }).catch((error)=>{
                    console.log("[ error: update file profileImage ]",error.message);
                    
                });
            }else{
                const new_media =  new Media(profileImageReq);
                dataReq.profileImage = new_media;
                new_media.save();
            }    
        }
    
        if(file.fieldname === 'cv'){
    
            const cvReq = {
                title : "cv",
                description  : "description cv",
                url : ''
            }
            cvReq.url = '/uploads/'+file.filename;
            dataReq.cv = cvReq;
            
            if(preventAboutMe.cv){
                const preventCv = await Media.findById({_id: preventAboutMe.cv});
    
                if (fs.existsSync('.'+preventCv.url)){
                    fs.unlink('.'+preventCv.url, (err) => {
                        if (err) {
                            console.error(err)  
                        }
                    });
                }
                preventCv.url = '/uploads/'+file.filename;
                const new_media = new Media(preventCv)
                Media.updateOne({_id : preventCv._id},new_media)
                .then((data)=>{
                    console.log(data);
                }).catch((error)=>{
                    console.log("[ error: update file cv ]",error.message);
                    
                });
            }else{
                const new_media =  new Media(cvReq);
                dataReq.cv = new_media;
                new_media.save();  
            }    
        }
     })
    
   
    const new_aboutMe = new AboutMe(dataReq);
    AboutMe.updateOne({_id : dataReq._id},new_aboutMe)
    .then((data)=>{
        res.json(data);
        return true;
    }).catch((error)=>{
        console.log("[ error: update About me ]",error.message);
        return ({msg : '[ error-aboutme : send data to database failed ]',error: error.message});
    });

});

// -------------------------------------------
router.post('/add_skills', async (req,res) =>{

    (await Skills.find()).forEach((skill) => {
        Skills.deleteOne( {_id: skill._id}).then().catch((error)=>{
            console.log(error.message)
        })
    });
    (await Skillitem.find()).forEach((skill) => {
        Skillitem.deleteOne( {_id: skill._id}).then().catch((error)=>{
            console.log(error.message)
        })
    });

    let dataReq = req.body;
    let skillsItems = req.body.skills.slice();
    dataReq.skills = [];
    const newSkill = new Skills(dataReq);
    await newSkill.save().then(async (data)=>{  
       console.log(await addSkillsItems(data,skillsItems));        
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    })

})

router.post('/update_skills', async (req,res) =>{    

    (await Skillitem.find()).forEach((skill) => {
        Skillitem.deleteOne( {_id: skill._id}).then().catch((error)=>{
            console.log(error.message)
        })
    });

    let dataReq = req.body;
    let skillsItems = req.body.skills.slice();
    dataReq.skills = [];

    const newSkill = new Skills(dataReq);
    Skills.updateOne({_id : dataReq._id},newSkill)
    .then(async (data)=>{
        await addSkillsItems(dataReq,skillsItems);
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message}); 
    });
});

const addSkillsItems = (skillObject,skillsItems) => {

        skillsItems.map((skill,index)=>{
            skill.order = index;
            let newskillitem = new Skillitem(skill)
            newskillitem.save().then((data)=>{ 
                return updateSkills(skillObject,data);
            }).catch((error)=>{
                console.log("[ error: update About me ]",error.message);
                return false;
            });
        });
        return 1;
}

const updateSkills = (skillsObject,skill)=>{

    Skills.findById({_id : skillsObject._id}).then((data) =>{ 
        Skills.updateOne({_id : skillsObject._id},{ $push: { skills: skill } }).then(()=>{
            return 1;
        }).catch((error) =>{
            console.log("error", error.message)
            return false;
        })
    });
    return 1;
}
// -------------------------------------------


router.post('/admin/signin', (req,res,next)=>{

    const {body} = req;
    
    const {firstName,lastName,password} = body;
    let {email} = body;

    if(!firstName){
        return res.send({
            success : false, 
            message : "error : Missing first name"
        });
    }
    if(!lastName){
        return res.send({
            success : false, 
            message : "error : Missing last name"
        });
    }
    if(!email){
        return res.send({
            success : false, 
            message : "error : Missing email"
        });
    }
    if(!password){ 
        return res.send({
            success : false, 
            message : "error : Missing password"
        });
    }

    email = email.toLowerCase();

    User.find({ email: email}, (err,previousUsers) => { 
        if(err) {
            return res.send({
                success : false, 
                message : "error : server error"
            });
        }
        else if(previousUsers.length > 0){ 
            return res.send({
                success : false, 
                message : "error : Account already exist"
            });
        }

        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        
        newUser.save((err,user)=>{
            if(err){
                return res.send({
                    success : true, 
                    message : "error : Not Signed up"
                });
            }else{
                res.send({
                    success : true, 
                    message : "success : Signed up"
                });
            }
        });
    });
});

router.post('/admin/login', (req,res,next)=>{

    const {body} = req; 

    const {password} = body;
    let {email} = body; 

    if(!email){
        return res.send({
            success : false, 
            message : "error : Email cannot be blank"
        });
    }
    if(!password){ 
        return res.send({
            success : false, 
            message : "error : Password cannot be blank"
        });
    }

    email = email.toLowerCase();

    User.find({ email: email},(err, users)=>{
         if(err){ 
             res.status(400).json({success: false, message : err.message});
             return;
         }
         if(users.length != 1){
            // return res.send({success: false, message: "invalid email"});
            res.status(400).json({success: false, message : "invalid email"});
            return;
         }
        const user = users[0];
        if(!user.validPassword(password)){
            // return res.send({success: false, message: "invalid password"});
            res.status(400).json({success: false, message : "invalid password"});
            return;
        }

        UserSession.findOneAndUpdate({userId : user._id},{ $set : {isDeleted : false}})
        .then((doc)=>{
            res.status(200).json({success: true, message : "valid sign in / session reactivated",data : doc, token : doc._id});
        }).catch((err)=>{
            const userSession =  new UserSession();
            userSession.userId = user._id;
            userSession.save((err,doc)=>{
                if(err){
                    // return res.send({success: false, message: err.message});

                    res.status(400).json({success: false, message : err.message});
                    return;
                }
                // return res.send({success: true, message:"valid sign in",token : doc._id})
                res.status(200).json({success: true, message : "valid sign in",data : doc, token : doc._id});
            });
        });

    });
});

router.get('/admin/verify', (req, res, next)=>{

    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id : token ,
        isDeleted: false
    }, (err,sessions)=>{
        if(err){
            // return res.send({
            //     success : false,
            //     message : "error : " + err.message
            // });

            res.status(400).json({success: false, message : err.message});
        }
        if(sessions.length != 1){
            // return res.send({
            //     success : false,
            //     message : "error : " + err.message
            // });
            res.status(400).json({success: false, message : "server error"});
        }else{
            // return res.send({
            //     success : true,
            //     message : "Good Session"
            // });
            res.status(200).json({success: true, message : "ok"});
        }
    });
});

router.get('/admin/logout', (req, res, next)=>{

    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({ _id : token, isDeleted: false},{ $set : { isDeleted: true }})
    .then((data)=>{
        res.status(200).json({success: true, data});
    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    });
});

module.exports = router;