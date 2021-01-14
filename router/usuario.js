const express = require('express')
const loginUser = require('../controllers/email')
const loginUserController = require('../controllers/email')
const registarUserController = require('../controllers/registarUsuario')
const userConfirmController = require('../controllers/userConfirm')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = express.Router()

router.post('/login', loginUserController)
router.post('/data', registarUserController)
router.get('/confirmar/:token', userConfirmController)

module.exports = router
