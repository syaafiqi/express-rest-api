require('dotenv').config()
require('express-group-routes')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./config/routes.js')
const bodyParser = require('body-parser')
const dbConnection = require('./model')
const statusCode = require('./constants/statusCode')
const utility = require('./helpers/utility.js')
app.use(cors())

// Sync DB
dbConnection.sequelize.sync().then(() => {
    console.log('Sync DB to ' + process.env.MYSQL_HOST + ':' + process.env.MYSQL_PORT + ' Completed')
}).catch((err) => {
    console.log('Sync DB to ' + process.env.MYSQL_HOST + ':' + process.env.MYSQL_PORT + ' Failed : ' + err.message)
});

app.use(utility.AssignId)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.group('/', (router) => {
    router.get('/', (req, res) => {
        return res.send(utility.GiveResponse(statusCode.success, process.env.APPNAME + " Version " + process.env.VERSION))
    })
    router.use('/', routes)
})
// all other requests redirect to 404
app.all("*", function (req, res) {
    return res.send(utility.GiveResponse(statusCode.notFound, 'NOT FOUND'));
});
app.listen(process.env.PORT || 3000, function () {
    console.log(process.env.APPNAME + ' running at http://' + process.env.HOSTNAME + ':' + process.env.PORT + '')
})
