const express = require('express');

const router  = express.Router();
const sessionController = require('../controllers/session-controller');
router.get('/insticator/session', sessionController.createOrUpdateSession);


module.exports = router;