
const express = require('express');
const auth = require('../middleware/auth')
const { get_all, add, update } = require('../Controllers/skills');
const router = express.Router();

// GET
router.get('/get_all', get_all);

// POST
router.post('/add', auth, add);
router.post('/update', auth, update)

module.exports = router;