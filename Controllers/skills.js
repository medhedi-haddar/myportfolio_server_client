
const Skills = require('../models/skills');

const get_all = async (req, res)=> {

    Skills.find()
    .then((data)=>{
        console.log(data);
         res.status(200).json(data);
    }).catch((error)=>{
        console.log(error)
         res.status(400).json({success: false, message:error.message});
    });     
};

const delete_one = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});
    
    try {
        const { id } = req.params;

        const Skills_instance = await Skills.findById({_id : id});
    
        if( Skills_instance._id){

            await Skills.deleteOne({_id: Skills_instance._id})
            .then((data)=>{
                res.status(200).json({success: true, data});
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
    
        let { body } = req;
        const newSkill = new Skills(body);
        await newSkill.save().then(async (data)=>{  
            Skills.find()
            .then((data)=>{
                res.status(200).json(data);
            })    

        }).catch((error)=>{
            res.status(400).json({success: false, message:error.message});
        })

    }catch(error){
        res.status(400).json({success: false, message:error.message});
    }
};

const update = async (req, res) => {

    if(!req.userId) return res.status(400).json({success: false, message : 'Unauthenticted'});

    try{
        let { body } = req;
        const new_Skills = new Skills(body);
        Skills.updateOne({_id : body._id},new_Skills)
        .then(async ()=>{
            Skills.find()
            .then((data)=>{
                res.status(200).json(data);
            });
            
        }).catch((error)=>{
            res.status(400).json({success: false, message:error.message});
        });
        
    }catch(error){
        res.status(400).json({success: false, message:error.message});
    }
};

module.exports = { get_all, add, update, delete_one};