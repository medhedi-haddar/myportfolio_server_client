const mongoose = require('mongoose');
const Media = require('./media');
// Schema
const Schema = mongoose.Schema;
// const aboutMeSchema = new Schema({
//     lastName: String,
//     firstName: String,
//     description: String,
    
//     update_date : {
//         type : String,
//         default : Date.now()
//     },
//     git_link : String,
//     cv_url: String,
//     profileImage : String
// });

const testAboutMeSchema = new Schema({
    lastName: String,
    firstName: String,
    description: String,
    git_link : String,
    cv : {   
        type: Schema.Types.ObjectId, 
        ref: 'media' 
    },
    profileImage : {   
            type: Schema.Types.ObjectId, 
            ref: 'media' 
        },
    update_date : {
        type : String,
        default : Date.now()
    }
});

// Model
const TestAboutMe = mongoose.model('testAboutMe', testAboutMeSchema);

module.exports = TestAboutMe;