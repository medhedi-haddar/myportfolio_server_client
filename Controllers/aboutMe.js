const AboutMe = require('../models/aboutMe');
const Media = require('../models/media');


const get_all = async (req, res)=> {

    AboutMe.find().populate(['cv','profileImage'])
    .then((data)=>{
        res.status(200).json(data);

    }).catch((error)=>{
        res.status(400).json({success: false, message:error.message});
    });   
};

const add = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});

    try{

        const { body}  = req;
        if(req.files[0]){
            let mediaReq = {
                title : "cv",
                description  : "cv .pdf",
                url : ''
            }
            mediaReq.url = '/uploads/'+req.files[0].filename;
            const new_media =  new Media(mediaReq);
            body.cv = new_media;
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
            body.profileImage = new_media;
            new_media.save();
        } 

        const new_aboutme =  new AboutMe(body);
        new_aboutme.save().then((data) => {
            res.status(200).json({success: true, data});
        }).catch((error)=>{
            res.status(400).json({success: false, message:error.message});
        });

    }catch(error){
        res.status(400).json({success: false, message:error.message});
    }
};

const update = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});

    try{
       
        const { body }  = req;
        const preventAboutMe = await AboutMe.findById({_id: body._id});
    
         // save image profile
         req.files.map( async (file)=>{
            if(file.fieldname === 'profileImage'){
    
                const profileImageReq = {
                    title : "profileImage",
                    description  : "description profileImage",
                    url : ''
                }
                profileImageReq.url = '/uploads/'+file.filename;
                body.profileImage = profileImageReq;
                
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
                    Media.updateOne({_id : preventProfileImage._id},new_media);
                }else{
                    const new_media =  new Media(profileImageReq);
                    body.profileImage = new_media;
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
                body.cv = cvReq;
                
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
                    Media.updateOne({_id : preventCv._id},new_media);
                }else{
                    const new_media =  new Media(cvReq);
                    body.cv = new_media;
                    new_media.save();  
                }    
            }
         })
        
       
        const new_aboutMe = new AboutMe(body);
        AboutMe.updateOne({_id : body._id},new_aboutMe)
        .then((data)=>{
            AboutMe.find().populate(['cv','profileImage']).then((data)=>{
                res.status(200).json(data);
            })
        }).catch((error)=>{
            return res.status(400).json({success: false, error: error.message});
        });
        
    }catch(error){
        res.status(400).json({success: false, message:error.message});
    }
};

module.exports = { get_all, add, update};