const express = require('express');
const router = express.Router();
const fbCtrl = require('../controllers/football.js')

   

router.get('', fbCtrl.getAll)
router.get('/fcs', fbCtrl.getFcs)
router.get('/fcs/:confName', fbCtrl.getFcsConfSchools)
router.get('/fbs', fbCtrl.getFbs)
router.get('/fbs/:confName', fbCtrl.getFbsConfSchools)
router.get('/comp/:schoolName', fbCtrl.getSchoolComp)




module.exports = router;