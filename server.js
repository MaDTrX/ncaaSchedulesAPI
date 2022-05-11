
const express = require('express')

require('./config/database.js')
require('dotenv').config()

const schedulesRouter = require('./routes/schedules.js')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

app.use('/', schedulesRouter)


app.listen(process.env.PORT || 5000, () => console.log('server listening'))

module.exports = app;