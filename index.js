const express = require('express')
const app = express()
app.use(express.json())

const db = require('./models')

// Route

const mRouter = require('./routes/matchRouter.js')
const pRouter = require('./routes/playerRouter.js')
app.use('/api/', mRouter)
app.use('/api/', pRouter)

const ts = Date.now()
let date_ob = new Date(ts)

app.use((req, res, next) =>{
    console.time('Request')
    console.log(`Method: ${req.method}\nURL: ${req.url}`)

    next();

    console.log('Finish')
    console.timeEnd('Request')
})
db.sequelize.sync().then((req) =>{
    app.listen(3000, () =>{
        console.log('\nServer is running at port: 3000...')
    })
})