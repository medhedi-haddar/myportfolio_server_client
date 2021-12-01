const express = require('express');
const signin  = require('../Controllers/admin.js');
const router = express.Router();

router.post('/signin' , signin);

module.exports  = router;