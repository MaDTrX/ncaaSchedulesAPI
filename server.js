
const express = require('express')
const cors = require('cors')

require('dotenv').config()
require('./config/database.js')

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200 
}

const schedulesRouter = require('./routes/schedules.js')
const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

app.use('/', schedulesRouter)


app.listen(process.env.PORT || 5000, () => console.log('server listening'))

module.exports = app;