const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mda:mda@cluster0.m9ebu.mongodb.net/mda?retryWrites=true&w=majority').then(()=>console.log('connected'))
.catch(e=>console.log(e));
const db = mongoose.connection

db.on('connected', async function () {
console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
    const Fcs = require('../models/fcs')
    const Fbs = require('../models/fbs')
    const ref = require('./ReferenceTable.json');
    const ncaa = require('./Ncaa.json');
    const fetch = require('node-fetch');
    const cheerio = require('cheerio')
    const pretty = require('pretty')
    await Fbs.deleteMany({})
    await Fcs.deleteMany({})
    //Sourced FBS schedules(season changes by year)
    const fbs = "https://api.sportsdata.io/v3/cfb/scores/json/Games/2022";

    //FBS authentification key
    const AuthFbs = {
    method: "GET",
    headers: {
        "Ocp-Apim-Subscription-Key": "24583a1bc99846b3b39a152b3dd54ad9"
    }
    };

    const week = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'WednesDay',
        4: 'Thursday',
        5: 'Friday',
        6: 'Sunday'
    }

    const month = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    }

    const clock = {
        0: '12',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '1',
        14: '2',
        15: '3',
        16: '4',
        17: '5',
        18: '6',
        19: '7',
        20: '8',
        21: '9',
        22: '10',
        23: '11',
        24: '12',
    }
    
    function getUniqueList() {
        //  return [...new Map(ncaa.map(schObj => [schObj[key], schObj])).values()];
        let sportCode = []
        ncaa.forEach((schObj) => {
        if (schObj.sportCode === "MFB") {
            sportCode.push(schObj)
            }
        })
        return sportCode
    }
    const uniqueNcaa = getUniqueList();

    const reducedObjArray = uniqueNcaa.map((schObj) => {
        return ({
        orgID: schObj.orgID,
        accountID: schObj.accountID,
        accountName: schObj.accountName,
        confName: schObj.conferenceName,
        confID: schObj.conferenceID
        })
    })
    async function getSchedules() {

        let response = await fetch(fbs, AuthFbs);
        let data = await response.json();
    
        var moddedData = [];
        for (let i = 0; i < data.length; i++) {
        let date = data[i].Day.split("T")
        let time = data[i].DateTime !== null ? data[i].DateTime.split("T") : 'Time TBA'
        let newTime
        if (Array.isArray(time)) {
            let splitTime = time[1].split(":")
            let AmPm = splitTime[0] < 12 ? 'am' : 'pm'
            newTime = clock[splitTime[0]] + ':' + splitTime[1] + AmPm
        }
        var moddedSchedules = {};
            moddedSchedules.sportId = "MFB",
            moddedSchedules.awayId = data[i].GlobalAwayTeamID.toString(),
            moddedSchedules.homeId = data[i].GlobalHomeTeamID.toString(),
            moddedSchedules.awayTeam = data[i].AwayTeamName,
            moddedSchedules.homeTeam = data[i].HomeTeamName,
            moddedSchedules.compEventDate = week[new Date(date[0]).getDay()] + ", " + month[new Date(date[0]).getMonth()] + " " + new Date(date[0]).getDate() + ", " + new Date(date[0]).getFullYear(),
            moddedSchedules.compEventTime = time === 'Time TBA' ? time : newTime,
        // moddedSchedules.CompEventLocation
            moddedSchedules.isNeutral = false,
            //moddedSchedules.stadium = data[i]["Stadium"]["Name"],
            //moddedSchedules.city = data[i]["Stadium"]["City"],
            //moddedSchedules.state = data[i]["Stadium"]["State"],
            //moddedSchedules.latitude = data[i]["Stadium"]["GeoLat"],
            //moddedSchedules.longitude = data[i]["Stadium"]["GeoLong"] 
            moddedData.push(moddedSchedules);
        }
        //console.log(moddedData)
    return moddedData
    }
    const promise =  getSchedules();
    
    function masterFbs() {
        comparehomeAndAwayIdValues(reducedObjArray);
        }
    
    async function comparehomeAndAwayIdValues(reducedObjArray) {
        let fbs  = await getSchedules()
        let homeNames = [];
        for (let i = 0; i < ref.length; i++) {
            for (let key in fbs)
            if (fbs[key].homeId === ref[i].teamID) {
                homeNames.push({
                    ...fbs[key],
                    homeName: ref[i].accountName
                })
            }
        }
            let allNames = [];
            for (let j = 0; j < ref.length; j++) {
                
                for (let key in homeNames)
                if (homeNames[key].awayId === ref[j].teamID) {
                    allNames.push({
                        ...homeNames[key],
                        awayName: ref[j].accountName
                    })
                }
            }
        orgIdAndAccoutId(allNames, reducedObjArray);
        }
    
    async function orgIdAndAccoutId(allNames, reducedObjArray) {
    
    let accountIdAndOrgId = []
    
    for (var a = 0; a < allNames.length; a++) {
        for (let key in reducedObjArray) {
            if (reducedObjArray[key].accountName === allNames[a].homeName) {
            accountIdAndOrgId.push({
            confName: reducedObjArray[key].confName,
            schoolName: reducedObjArray[key].accountName,
            confID: reducedObjArray[key].confID,
            accountID: reducedObjArray[key].accountID,
            ncaaOrgID: reducedObjArray[key].orgID,
            ...allNames[a]
            })
        }
        }
    }
    
    
    for (var b = 0; b < accountIdAndOrgId.length; b++) {
        for (let key in reducedObjArray) {
        
        if (reducedObjArray[key].accountName === accountIdAndOrgId[b].awayName) {
            Fbs.create({
            confName2: reducedObjArray[key].confName,
            confID2: reducedObjArray[key].confID,
            compEventName: reducedObjArray[key].accountName,
            accountID2: reducedObjArray[key].accountID,
            opponentNCAAOrgID: reducedObjArray[key].orgID,
            ...accountIdAndOrgId[b]
            })
        }
        }
    }
    
    }
    masterFbs();

    const fcs = ['https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13733', 
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13697', 
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13698',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13699',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13700',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13701',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13702',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13703',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13704',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13705',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13706',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13707',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13708',
    'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13709',
    ]


    async function scraper () {

    const data = []
    let batch = await Promise.all(fcs.map((s) => fetch(s).then((r) => r.json())))

    batch.forEach(week => {
        const $ = cheerio.load(week.html)
        $('.spring').each((i, el) => {
        let date = $(el).prev().text()
        $(el).find('.spring1').each((i, el) => {
            let str = []
            if (pretty($(el).text()).includes(' at ')) {
            str = pretty($(el).text()).split(' at ')
            } else if (pretty($(el).text()).includes(' vs. ')) {
            str = pretty($(el).text()).split(' vs. ')
            }
            data.push({
            'schoolName' : str[str.length -1],
            'compEventName' : str[0],
            'compEventDate' : date + ", 2022",
            'compEventTime' : $(el).next().text(),
            'isNeutral': str[str.length -1].includes('(') ? true : false
            })
        })
        })
    })
    return data
    }
    async function masterFcs() {
    return await scraper()
    }

    async function compareNameValues () {
    let data =  await masterFcs()

    let mapSchoolName = {}
    for (let i = 0; i < data.length; i++) {
        mapSchoolName[data[i].schoolName] = ''
        mapSchoolName[data[i].compEventName] = ''
    }
    for (let j = 0; j < ref.length; j++) {
        for (key in ref[j]) {
        if (mapSchoolName[ref[j][key]] !== undefined) {
            mapSchoolName[ref[j][key]] = ref[j].accountName
        }
        }
    }
    for (let k = 0; k < data.length; k++) {
        if (mapSchoolName[data[k].schoolName]){
        data[k].schoolName = mapSchoolName[data[k].schoolName]
        } 
        if (mapSchoolName[data[k].compEventName]) {
        data[k].compEventName = mapSchoolName[data[k].compEventName]
        }
    }
    
    let accountIdAndOrgId = []
    for (let l = 0 ; l < data.length; l++){
        for (let key in reducedObjArray) {
            if (reducedObjArray[key].accountName == data[l].schoolName) {
            accountIdAndOrgId.push({
            confName: reducedObjArray[key].confName,
            confID: reducedObjArray[key].confID,
            accountID: reducedObjArray[key].accountID,
            ncaaOrgID: reducedObjArray[key].orgID,
            ...data[l]
            })
        }
        }
    }
    //console.log(accountIdAndOrgId.length)

    for (let m = 0; m < accountIdAndOrgId.length; m++) {
    for (let key in reducedObjArray) {
        
        if (reducedObjArray[key].accountName === accountIdAndOrgId[m].compEventName) {
        Fcs.create({
            confName2: reducedObjArray[key].confName,
            confID2: reducedObjArray[key].confID,
            accountID2: reducedObjArray[key].accountID,
            opponentNcaaOrgID: reducedObjArray[key].orgID,
            ...accountIdAndOrgId[m]
        })
        }
    }
    }
    }
    compareNameValues()
});

