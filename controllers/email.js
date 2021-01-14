const loginUser = (req, res) => {
  const { nome, senha } = req.body

  if (nome == 'valdo' && senha == 'valdo') {
    res.json({ log: 'Sucessed' })
  }
}

module.exports = loginUser
