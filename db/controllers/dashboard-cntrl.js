const Dashboard = require('../models/dashboard-model')

createUser = (req, res) => {
    const body = req.body

    if(!body){
        return res.status(400)
    }

    const user = new Dashboard(body)

    if(!user){
        return res.status(400)
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                id: user._id
            })
        })
        .catch(err => {
            return res.status(400).json({
                err
            })
        })
}

getUser = async (req,res) => {
    await Dashboard.find({}, (err, users) => {
        if(err){
            return res.status(400)
        }
        if(!users.length){
            return res.status(404)
        }
        return res.status(200).json({data: users})
    }).catch(err => {
        console.log('error')
    })
}

module.exports = {
    createUser,
    getUser
}