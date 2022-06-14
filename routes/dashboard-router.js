const express = require('express')

const DashboardCtrl = require('../db/controllers/dashboard-cntrl')

const router = express.Router()

router.post('/user', DashboardCtrl.createUser)
router.get('/user', DashboardCtrl.getUser)

module.exports = router