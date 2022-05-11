const Fbs = require('../models/fbs.js')

module.exports = {
    getFbs,
    // getFcsAccount
}
function getFbs (req, res) {
 Fbs.find({}, function (err, all) {
     if (err) {
         res.json({message: err})
     }
     console.log(all)
     res.send(all)
 })
    }