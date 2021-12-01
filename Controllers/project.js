
const Project = require('../models/project');
const Media = require('../models/media');
const fs = require('fs')
const uploadFiles = require('../middleware/uploadFiles');

const getProjects = async (req, res)=> {

    Project.find().populate('cover')
    .then((data)=>{
        return res.status(200).json(data);
    }).catch((error)=>{
        return res.status(400).json({success: false, message:error.message});
    });     
}

const getOneProject = async (req, res)=> {

    const { id } = req.params;
    console.log(id);
    Project.findById({_id : id}).populate('cover')
    .then((data)=>{
        return res.status(200).json(data);
    }).catch((error)=>{
        return res.status(400).json({success: false, message:error.message});
    });     
}

const deleteProject = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});
    const { id } = req.params;

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
        res.status(200).json({success: true, data});
    })
    .catch((error)=>{
        res.status(400).json({success: false, message: error.message});
    }); 

}
const addProject = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});
    try{
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
    }catch(error){
        console.log(error.message)
    }
};

const updateProject = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});

    try{
        const { body } = req;
        const preventProject = await Project.findById({_id: body._id}).populate('cover');
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
                title : body.title,
                description  : "project_cover",
                url : ''
            }
            mediaReq.url = '/uploads/'+req.files[0].filename;
            const new_media =  new Media(mediaReq);
            Media.updateOne({_id : preventProject.cover._id},new_media)
            .then((data)=>{
                console.log(data);
            }).catch((error)=>{
                console.log("[ error: update file project ]",error.message);
                
            });
        }
        
        const new_project = new Project(body);

        Project.updateOne({_id : body._id},new_project)
        .then((data)=>{
            return res.status(200).json({success: true, data : data});
        }).catch((error)=>{
            return res.status(400).json({success: false, error : error.message});
        });
        
    }catch(error){
        console.log(error.message)
        return res.status(400).json({success: false, error : error.message});
    }
};

// const dataReq = req.body;
//     const preventProject = await Project.findById({_id: dataReq._id}).populate('cover');
//     if(req.files[0]){
      
//         if(preventProject.cover._id){
//             if (fs.existsSync('.'+preventProject.cover.url)){
//                 fs.unlink('.'+preventProject.cover.url, (err) => {
//                     if (err) {
//                         console.error(err)  
//                     }
//                 });
//             }
//         }
//         let mediaReq = {
//             _id :preventProject.cover._id,
//             title : dataReq.title,
//             description  : "project_cover",
//             url : ''
//         }
//         mediaReq.url = '/uploads/'+req.files[0].filename;
//         const new_media =  new Media(mediaReq);
//         Media.updateOne({_id : preventProject.cover._id},new_media)
//         .then((data)=>{
//             console.log(data);
//         }).catch((error)=>{
//             console.log("[ error: update file profileImage ]",error.message);
            
//         });
//     }
    
//     const new_project = new Project(dataReq);
//     Project.updateOne({_id : dataReq._id},new_project)
//     .then((data)=>{
//         res.json(data);
//         return true;
//     }).catch((error)=>{
//         console.log("[ error: update Project me ]",error.message);
//         return ({msg : '[ error-aboutme : send data to database failed ]',error: error.message});
//     });

module.exports = {
    getProjects,
    getOneProject,
    addProject,
    updateProject,
    deleteProject
}