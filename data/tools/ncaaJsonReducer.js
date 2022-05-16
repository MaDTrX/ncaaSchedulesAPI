const ncaaRef = require('../references/Ncaa.json');

function getUniqueList() {
    //  return [...new Map(ncaa.map(schObj => [schObj[key], schObj])).values()];
    let sportCode = []
    ncaaRef.forEach((schObj) => {
        if (schObj.sportCode === "MFB") {
            sportCode.push(schObj)
        }
    })
    return sportCode
}

const uniqueNcaa = getUniqueList();

function reducedNcaa (){

    const reducedNcaaJson = uniqueNcaa.map((schObj) => {
        return ({
            orgID: schObj.orgID,
            accountID: schObj.accountID,
            accountName: schObj.accountName,
            confName: schObj.conferenceName,
            confID: schObj.conferenceID
        })
    
    
    })
    return reducedNcaaJson
}

module.exports = {
    reducedNcaa
}