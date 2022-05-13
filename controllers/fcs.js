const Fcs = require('../models/fcs.js')

module.exports = {
    getFcs,
    getConfSchools
    // getFcsAccount
}
function getFcs (req, res) {
 Fcs.find({}, function (err, all) {
     if (err) {
         res.json({message: err})
     }
     res.send(all)
 })
}
 function getConfSchools(req, res) {
    //  console.log(req)
     Fcs.find({$or: [{confName: req.params.confName}, {confName2: req.params.confName}]}, (err, conference) => {
         const schools = []
         conference.forEach(comp => {
            //  console.log(comp)
             if (comp.confName === req.params.confName) {
                 schools.push(comp.schoolName)
             } else if ( comp.confName2 === req.params.ConfName) {
                 schools.push(comp.compEventName)
             }
            })
            const set = new Set(schools)
            res.send([...set])
        
     })

    }