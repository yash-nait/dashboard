const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Dashboard = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        salary: { type: Number, required: true },
        yoe: { type: Number, required: true },
        skills: {type: [String], required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('dashboard', Dashboard)