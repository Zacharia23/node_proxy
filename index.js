const express = require('express')
const cors = require('cors')
const { APPCENTER } = require('ci-info')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const logger = require('./config/logger')

const PORT = process.env.PORT || 5000

const app = express()

/* Rate Limit */
const limiter = rateLimit({
    windowMs: 10  *60 * 1000,
    max: 100,
})
app.use(limiter)
app.set('trust proxy', 1)

/* Set Static Folder */
app.use(express.static('public'))

/* ROUTES */
app.use('/api', require('./routes'))

app.use(cors())

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))