const references = require('../references/football');
async function sortNameValues(rawData) {
    if (rawData[0].mfb === "FCS") {
        let roughData = await rawData
        let mapSchoolName = {}
        for (let i = 0; i < roughData.length; i++) {
            mapSchoolName[roughData[i].schoolName] = ''
            mapSchoolName[roughData[i].compEventName] = ''
        }
        for (let j = 0; j < references.length; j++) {
            for (key in references[j]) {
                if (mapSchoolName[references[j][key]] !== undefined) {
                    mapSchoolName[references[j][key]] = references[j].accountName
                }
            }
        }
        for (let k = 0; k < roughData.length; k++) {
            if (mapSchoolName[roughData[k].schoolName]) {
                roughData[k].schoolName = mapSchoolName[roughData[k].schoolName]
            }
            if (mapSchoolName[roughData[k].compEventName]) {
                roughData[k].compEventName = mapSchoolName[roughData[k].compEventName]
            }
        }
        return roughData

    } 
    if (rawData[0].mfb === "FBS") {
        let fbs  = await rawData
        let homeNames = [];
        for (let i = 0; i < references.length; i++) {
            for (let key in fbs)
            if (fbs[key].homeId === references[i].teamID) {
                homeNames.push({
                    ...fbs[key],
                    schoolName: references[i].accountName
                })
            }
        }
            let roughData = [];
            for (let j = 0; j < references.length; j++) {
                
                for (let key in homeNames)
                if (homeNames[key].awayId === references[j].teamID) {
                    roughData.push({
                        ...homeNames[key],
                        compEventName: references[j].accountName
                    })
                }
            }
            return roughData
    }
}

module.exports = {
    sortNameValues
}