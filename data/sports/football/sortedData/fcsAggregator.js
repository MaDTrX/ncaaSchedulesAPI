const Football = require('../../../../models/football')
const ncaaReducer = require('../../../tools/ncaaJsonReducer');
const nameTool = require('../../../tools/nameSorter');
const idTool = require('../../../tools/idSorter');
const footballData = require('../rawData/fcsScraper')

const ncaaReduct = ncaaReducer.reducedNcaa()

async function saveFcsData() {
    const data =  await footballData.getFcs()
    const roughData = nameTool.sortNameValues(data)
    const sortedData = idTool.insertIDs(roughData, ncaaReduct, Football)
    
}

module.exports = {
    saveFcsData
}

