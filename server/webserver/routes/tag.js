const express = require('express');

const router  = express.Router();
const tagController = require('../controllers/tag-controller');
router.get('/instag.js', tagController.fetchTagContent);






module.exports = router;