const express = require('express');
const signin  = require('../Controllers/admin');
const router = express.Router();

router.post('/signin' , signin);

module.exports  = router;