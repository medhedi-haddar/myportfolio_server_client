
const Project = require('../models/project');
const Media = require('../models/media');
const fs = require('fs');

const get_all = async (req, res)=> {

    Project.find().populate('cover')
    .then((data)=>{
        return res.status(200).json(data);
    }).catch((error)=>{
        return res.status(400).json({success: false, message: error.message});
    });     
};

const get_one = async (req, res)=> {

    const { id } = req.params;
    Project.findById({_id : id}).populate('cover')
    .then((data)=>{
        return res.status(200).json(data);
    }).catch((error)=>{
        return res.status(400).json({success: false, message: error.message});
    });     
};

const delete_one = async (req, res) => {

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
const add = async (req, res) => {

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
            Project.find().populate('cover').then(()=>{
                res.status(200).json(data);
            })
        }).catch((error)=>{
            return res.status(400).json({success: false, message: error.message});
        });

    }catch(error){
        return res.status(400).json({success: false, message: error.message});
    }
};

const update = async (req, res) => {

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
        }
        
        const new_project = new Project(body);

        Project.updateOne({_id : body._id},new_project)
        .then((data)=>{
            return res.status(200).json({success: true, data: data});
        }).catch((error)=>{
            return res.status(400).json({success: false, error: error.message});
        });
        
    }catch(error){
        return res.status(400).json({success: false, error: error.message});
    }
};

module.exports = { get_all, get_one, add, update, delete_one };