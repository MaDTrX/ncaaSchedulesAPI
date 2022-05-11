const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fbsSchema = new Schema({
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
  isNeutral: {type: Boolean},

}, {
  timestamps: true
});

module.exports = mongoose.model('fbs', fbsSchema);