require('dotenv').config()
const CryptoJS = require('crypto-js')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
  service: 'yahoo',
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORDEMAIL
  }
})

transporter.verify((err, sucess) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Email pronto para ser usado!')
  }
})

const registarUsuario = async (req, res) => {
  try {
    const { username, email, senha, contacto } = req.body

    const senhas = await CryptoJS.HmacSHA1(
      senha,
      process.env.SECRET_KEY_CRYPTY
    ).toString(CryptoJS.enc.Hex)

    const userDate = {
      username: username,
      email: email,
      senha: senhas,
      contacto: contacto
    }

    if (userDate) {
      //res.json(userDate)
      const userDate = {
        sub: 1
      }

      const tokenEmail = await jwt.sign(userDate, process.env.JWTSECRE_KEY, {
        expiresIn: '5m'
      })

      const url = `http://localhost:3001/confirmar/${tokenEmail}`

      let mail = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Busniss_MOZ',
        html: `<h1> Seja Bem Vindo ao nosso sit </h1><p> Para concliur a seu registo confirme: </p> <p><button><a href="${url}">Confirmar</a></buttton>`
      }

      await transporter.sendMail(mail, (err, info) => {
        if (err) {
          res.status(403).json({ error: 'email nao enviado!' })
        } else {
          res.json({ Success: 'Confirme no seu Emial que ja seu Email' })
        }
      })
    }
  } catch (err) {}
}

module.exports = registarUsuario
