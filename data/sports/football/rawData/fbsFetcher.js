const fetch = require('node-fetch');
const endpoints = require('../../../endpoints/football.js')
const timeTools = require('../../../tools/dateTime.js')

const fbs = endpoints.fbsEndpoints()
const Auth = endpoints.fbsAuth()
const days = timeTools.day()
const months = timeTools.month()

async function getFbs() {

    let response = await fetch(fbs, Auth);
    let batch = await response.json();

    var data = [];
    for (let i = 0; i < batch.length; i++) {
        let date = batch[i].Day.split('T')
        let militaryTime = batch[i].DateTime !== null ? batch[i].DateTime.split('T') : 'Time TBA'
        let newTime
        if (Array.isArray(militaryTime)) {
            newTime = timeTools.time(militaryTime)
        }
        data.push({
            mfb : 'FBS',
            requested: false,
            booked: false,
            awayId : batch[i].GlobalAwayTeamID.toString(),
            homeId : batch[i].GlobalHomeTeamID.toString(),
            compEventTeam : batch[i].AwayTeamName,
            schoolTeam : batch[i].HomeTeamName,
            compEventDate : months[new Date(date[0]).getMonth()] + ' ' + new Date(date[0]).getDate() + ', ' + new Date(date[0]).getFullYear() + ' (' + days[new Date(date[0]).getDay()] + ')',
            compEventTime : militaryTime === 'Time TBA' ? militaryTime : newTime,
            isNeutral : batch[i].NeutralVenue? 'VS.' : 'AT',
        })
         
    }

    return data
}

module.exports = {
    getFbs
}