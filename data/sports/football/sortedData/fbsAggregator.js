const Football = require('../../../../models/football')
const ncaaReducer = require('../../../tools/ncaaJsonReducer');
const nameTool = require('../../../tools/nameSorter');
const idTool = require('../../../tools/idSorter');
const footballData = require('../rawData/fbsFetcher')

const ncaaReduct = ncaaReducer.reducedNcaa()

async function saveFbsData() {
    const data =  await footballData.getFbs()
    const roughData = nameTool.sortNameValues(data)
    const sortedData = idTool.insertIDs(roughData, ncaaReduct, Football)

}

module.exports = {
    saveFbsData
}