const jwt = require('jsonwebtoken')
require('dotenv').config()

const userConfirma = (req, res) => {
  jwt.verify(req.params.token, process.env.JWTSECRE_KEY, (err, data) => {
    if (err) {
      res.status(401).json({
        mensagem: 'token Inváldo',
        errorMsg: err.message
      })
    } else {
      res.json({ Confimado: 'Confrmado sucesso!' })
    }
  })
}

module.exports = userConfirma
