const express = require('express');
 const router = express.Router();
 const clearDbCtrl = require('../controllers/clear-db');
 
 router.get('/', clearDbCtrl.clearDb);
 
 module.exports = router;