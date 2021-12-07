
const Experience = require('../models/experience');

const get_all = async (req, res)=> {

    Experience.find()
    .then((data)=>{
        return res.status(200).json(data);
    }).catch((error)=>{
        return res.status(400).json({success: false, message:error.message});
    });     
};

const get_one = async (req, res)=> {

    const { id } = req.params;
    Experience.findById({_id : id})
    .then((data)=>{
        return res.status(200).json(data);
    }).catch((error)=>{
        return res.status(400).json({success: false, message:error.message});
    });     
};

const delete_one = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});
    
    try {
        const { id } = req.params;

        const experience_instance = await Experience.findById({_id : id});
    
        if( experience_instance._id){

            await Experience.deleteOne({_id: experience_instance._id})
            .then((data)=>{
                res.status(200).json(data);
            })
            .catch((error)=>{
                res.status(400).json({success: false, message: error.message});
            }); 
        }
    } catch (error) {
        res.status(400).json({success: false, message:error.message});
    }
    

};

const add = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});

    try{
        const { body } = req;
        const new_experience =  new Experience(body);
        new_experience.save().then(()=>{
            res.status(200).json({new_experience});
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
       
        let { body } = req;
        const new_experience = new Experience(body);
        Experience.updateOne({_id : body._id},new_experience)
        .then((data)=>{
            res.status(200).json({new_experience});
            
        }).catch((error)=>{
            res.status(400).json({success: false, message:error.message});
        });
        
    }catch(error){
        res.status(400).json({success: false, message:error.message});
    }
};

module.exports = { get_all, get_one, add, update, delete_one };