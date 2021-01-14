const express = require('express')
const userRouter = require('./router/usuario')
const app = express()

app.use(express.json())

app.use('/', userRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`http://localhost:3001/`)
})
