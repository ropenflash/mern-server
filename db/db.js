const mongoose = require('mongoose')

const {DB_NAME,DB_PASSWORD, PORT, MONGODB_URL}= process.env

const mongourl=MONGODB_URL.replace('<password>',DB_PASSWORD).replace('<dbname>',DB_NAME)


mongoose.connect(mongourl, {useNewUrlParser: true,
useCreateIndex: true})