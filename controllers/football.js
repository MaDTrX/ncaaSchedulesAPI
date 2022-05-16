const Football = require('../models/football.js')

module.exports = {
    getAll,
    getFbs,
    getFcs,
    getFcsConfSchools,
    getFbsConfSchools,
    getSchoolComp
}

function getAll(req, res) {
    Football.find({}, function (err, all) {
        if (err) {
            res.send({ message: err })
        }
        res.send(all)
    })
}
function getFbs(req, res) {
    Football.find({ mfb: "FBS" }, function (err, fbs) {
        if (err) {
            res.send({ message: err })
        }
        res.send(fbs)
    })
}

function getFcs(req, res) {
    Football.find({ mfb: "FCS" }, function (err, fcs) {
        if (err) {
            res.send({ message: err })
        }
        res.send(fcs)
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
        res.send([...set])
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
        res.send([...set])
    })
}


function getSchoolComp(req, res) {
    Football.find({ $or: [{ schoolName: req.params.schoolName }, { compEventName: req.params.schoolName }] }, (err, comp) => {
        res.send(comp)
    })
}

