const express = require('express');
const router = express.Router();
const fcsCtrl = require('../controllers/fcs.js')
const fbsCtrl = require('../controllers/fbs.js')

   
router.get('/fcs', fcsCtrl.getFcs)
router.get('/fbs', fbsCtrl.getFbs)
// router.get('/fcs/:accountId', fcsCtrl.getFcsAccount())




module.exports = router;