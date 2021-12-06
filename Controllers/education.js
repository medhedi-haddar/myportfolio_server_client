
const Education = require('../models/education');

const get_all = async (req, res)=> {

    Education.find()
    .then((data)=>{
        return res.status(200).json(data);
    }).catch((error)=>{
        console.log(error)
        return res.status(400).json({success: false, message:error.message});
    });     
};

const get_one = async (req, res)=> {

    const { id } = req.params;
    Education.findById({_id : id})
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

        const education_instance = await Education.findById({_id : id});
    
        if( education_instance._id){

            await Education.deleteOne({_id: education_instance._id})
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
        const new_education =  new Education(body);
        new_education.save().then(()=>{
            res.status(200).json({new_education});
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
        const new_education = new Education(body);
        Education.updateOne({_id : body._id},new_education)
        .then((data)=>{
            res.status(200).json({new_education});
            
        }).catch((error)=>{
            res.status(400).json({success: false, message:error.message});
        });
        
    }catch(error){
        res.status(400).json({success: false, message:error.message});
    }
};

module.exports = { get_all, get_one, add, update, delete_one };