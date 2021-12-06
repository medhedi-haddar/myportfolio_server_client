
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);      
    },
    filename: (req, file, cb) => {
        console.log(file)
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
    ,
    onError : function(err, next) {
        console.log('error', err.message);
        next(err);
      }
});

let  uploadFiles = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg+xml"  || file.mimetype == "image/gif"  || file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf, .png, .jpg and .jpeg a format allowed!'));
        }
    }
}).any();

module.exports = uploadFiles;