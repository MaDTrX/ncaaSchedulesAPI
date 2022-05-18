const endpoints = require('../../../endpoints/football.js')
const fetch = require('node-fetch');
const cheerio = require('cheerio')
const pretty = require('pretty')


const fcs = endpoints.fcsEndpoints()


async function getFcs() {

    const data = []
    let batch = await Promise.all(fcs.map((s) => fetch(s).then((r) => r.json())))

    batch.forEach(week => {
        const $ = cheerio.load(week.html)
        $('.spring').each((i, el) => {
            let date = $(el).prev().text()
            let dateArray = date.split(' ')
            $(el).find('.spring1').each((i, el) => {
                let str = []
                if (pretty($(el).text()).includes(' at ')) {
                    str = pretty($(el).text()).split(' at ')
                } else if (pretty($(el).text()).includes(' vs. ')) {
                    str = pretty($(el).text()).split(' vs. ')
                }

                data.push({
                    mfb: 'FCS',
                    requested: false,
                    booked: false,
                    schoolName: str[str.length - 1],
                    compEventName: str[0],
                    compEventDate: dateArray[1] + dateArray[2] + ", 2022" + '(' + dateArray[0] + ')',
                    compEventTime: $(el).next().text(),
                    isNeutral: str[str.length - 1].includes('(in') ? 'VS.' : 'AT'
                })
            })
        })
    })

    return data
}

module.exports = {
    getFcs
}