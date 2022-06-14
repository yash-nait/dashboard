const mongoose = require('mongoose')

require("dotenv").config()

mongoose
    .connect(`mongodb+srv://dbyash:${process.env.password}@porjectdb.gs8nc.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true})
    .catch(e => {
        console.log('Connnection error', e.message)
    })

const db = mongoose.connection

module.exports = db 