const express = require('express');
const { signin,updateProfile }  = require('../Controllers/admin');
const auth = require('../middleware/auth');
const router = express.Router();

// POST
router.post('/signin' ,signin);
router.post('/update',auth,updateProfile)

module.exports  = router;