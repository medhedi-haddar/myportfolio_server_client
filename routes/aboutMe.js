const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const uploadFiles = require('../middleware/uploadFiles');
const { get_all, add,update } = require('../Controllers/aboutMe');

// GET
router.get('/get_all', get_all);

// POST
router.post('/add',auth,uploadFiles,add);
router.post('/update',auth,uploadFiles,update)

module.exports = router;