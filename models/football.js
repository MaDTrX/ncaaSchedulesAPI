const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footballSchema = new Schema({
  schoolName: {type: String},
  accountID: {type: String},
  ncaaOrgID: {type: String},
  confName: {type: String},
  confID: {type: String},
  compEventName: {type: String},
  accountID2: {type: String},
  opponentNcaaOrgID: {type: String},
  confName2: {type: String},
  confID2: {type: String},
  compEventDate: {type: String},
  compEventTime: {type: String},
  isNeutral: {type: String},
  requested: {type: Boolean},
  booked: {type: Boolean},
  mfb: {type: String},

}, {
  timestamps: true
});

module.exports = mongoose.model('mfbSchedule', footballSchema);