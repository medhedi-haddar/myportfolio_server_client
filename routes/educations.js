const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { get_all, get_one, add,update, delete_one } = require('../Controllers/education');

// GET
router.get('/get_one/:id', get_one);
router.get('/get_all', get_all);

// POST
router.post('/delete_one/:id', auth,delete_one);
router.post('/add',auth,add);
router.post('/update',auth,update)

module.exports = router;