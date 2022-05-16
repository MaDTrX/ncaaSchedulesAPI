const Football = require('../models/football.js')

module.exports = {
    getFbs,
    getFcs,
    getFcsConfSchools,
    getFbsConfSchools,
    getSchoolComp
}

function getFbs(req, res) {
    Football.find({ mfb: "FBS" }, function (err, all) {
        if (err) {
            res.json({ message: err })
        }
        res.json(all)
    })
}

function getFcs(req, res) {
    Football.find({ mfb: "FCS" }, function (err, all) {
        if (err) {
            res.json({ message: err })
        }
        res.json(all)
    })
}


function getFbsConfSchools(req, res) {
    Football.find({
        $and: [
            { $or: [{ mfb: "FBS" }] },
            {
                $or: [{ confName: req.params.confName }, { confName2: req.params.confName }]
            }
        ]
    }, (err, conference) => {
        const schools = []
        conference.forEach(comp => {
            if (comp.confName === req.params.confName) {
                schools.push(comp.schoolName)
            } else if (comp.confName2 === req.params.ConfName) {
                schools.push(comp.compEventName)
            }
        })
        const set = new Set(schools)
        res.json([...set])
    })
}

function getFcsConfSchools(req, res) {
    console.log(req)
    Football.find({
        $and: [
            { $or: [{ mfb: "FCS" }] },
            {
                $or: [{ confName: req.params.confName }, { confName2: req.params.confName }]
            }
        ]
    }, (err, conference) => {
        const schools = []
        conference.forEach(comp => {
            if (comp.confName === req.params.confName) {
                schools.push(comp.schoolName)
            } else if (comp.confName2 === req.params.ConfName) {
                schools.push(comp.compEventName)
            }
        })
        const set = new Set(schools)
        res.json([...set])
    })
}


function getSchoolComp(req, res) {
    Football.find({ $or: [{ schoolName: req.params.schoolName }, { compEventName: req.params.schoolName }] }, (err, comp) => {
        res.json(comp)
    })
}

