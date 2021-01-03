const express = require('express')
const cors= require('cors')
const dotenv= require('dotenv')
const users= require('./routes/users')
const admin= require('./routes/admin')
dotenv.config('./.env')
const app = express()


require('./db/db')



app.use(express.json())
app.use(cors())

app.use('/users',users)
app.use('/api',admin)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT ${process.env.PORT}`)
})