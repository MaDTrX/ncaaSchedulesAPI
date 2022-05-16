const Football = require('../../models/football')

async function del () {
    await Football.deleteMany({})
}

module.exports = {
    del
}