const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


mongoose.connect(config.MONGOURL)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app