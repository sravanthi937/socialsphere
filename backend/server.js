const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

connectDB()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/comments', require('./routes/comments'))

app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
