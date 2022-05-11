const Fcs = require('../models/fcs.js')

module.exports = {
    getFcs,
    // getFcsAccount
}
function getFcs (req, res) {
 Fcs.find({}, function (err, all) {
     if (err) {
         res.json({message: err})
     }
     console.log(all)
     res.send(all)
 })
    }