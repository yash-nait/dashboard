const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const dashboardRouter = require('./routes/dashboard-router')

const app = express()
const apiPort = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', dashboardRouter)

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'));
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });
}

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))