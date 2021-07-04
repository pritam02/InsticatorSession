const express = require('express');

const router  = express.Router();
router.get('/health', (req, res) => {
    res.status(200).send("server is up and running");
});






module.exports = router;