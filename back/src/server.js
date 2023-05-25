require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes')
const middleware = require('./middleware')

const app = express()
const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.use(express.json())
app.use(cors())
app.use('/', router)
app.use(middleware.errorHandler)
