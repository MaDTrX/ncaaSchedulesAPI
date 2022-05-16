const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('connected', async function () {

console.log(`Connected to MongoDB at ${db.host}:${db.port}`);

const eraseTool = require('../data/tools/deleteDB')
const fbsAggregateTool = require('../data/sports/football/sortedData/fbsAggregator')
const fcsAggregateTool = require('../data/sports/football/sortedData/fcsAggregator')

eraseTool.del()
fbsAggregateTool.saveFbsData()
fcsAggregateTool.saveFcsData()

})



    
