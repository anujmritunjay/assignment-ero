const express = require('express')
const authRoute = require('./routes/authRoute')
const customerRoute = require('./routes/customerRoute')
const errorMiddleware = require('./middleware/error')

const app = express()

const PORT = 4040



app.use(express.json())
app.use('/auth', authRoute)
app.use('/customer', customerRoute)

app.get('/', (req, res)=>{
    res.json({
        success: true,
        message: "Hello from theoooooo server"
    })
})

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
app.use(errorMiddleware)