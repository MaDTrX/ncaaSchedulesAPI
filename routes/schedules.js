const express = require('express');
const router = express.Router();
const fcsCtrl = require('../controllers/fcs.js')
const fbsCtrl = require('../controllers/fbs.js')

   
router.get('/fcs', fcsCtrl.getFcs)
router.get('/fcs/:confName', fcsCtrl.getConfSchools)
router.get('/fcs/comp/:schoolName', fcsCtrl.getSchoolComp)
router.get('/fbs', fbsCtrl.getFbs)
router.get('/fbs/:confName', fbsCtrl.getConfSchools)
router.get('/fbs/comp/:schoolName', fbsCtrl.getSchoolComp)
// router.get('/fcs/:accountId', fcsCtrl.getFcsAccount())




module.exports = router;