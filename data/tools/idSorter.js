
async function insertIDs(data, ncaa, sport) {
   let response = await data
    // console.log(response)
    let accountIdAndOrgId = []
    
    for (let a = 0; a < response.length; a++) {
        for (let key in ncaa) {
            if (ncaa[key].accountName === response[a].schoolName) {
            accountIdAndOrgId.push({
            confName: ncaa[key].confName,
            schoolName: ncaa[key].accountName,
            confID: ncaa[key].confID,
            accountID: ncaa[key].accountID,
            ncaaOrgID: ncaa[key].orgID,
            ...response[a]
            })
        }
        }
    }
    
    for (let b = 0; b < accountIdAndOrgId.length; b++) {
        for (let key in ncaa) {
        
        if (ncaa[key].accountName === accountIdAndOrgId[b].compEventName) {
            sport.create({
            confName2: ncaa[key].confName,
            confID2: ncaa[key].confID,
            compEventName: ncaa[key].accountName,
            accountID2: ncaa[key].accountID,
            opponentNCAAOrgID: ncaa[key].orgID,
            ...accountIdAndOrgId[b]
        })
        }
        }
    }
   
}

module.exports = {
    insertIDs
}
