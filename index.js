const express = require('express')
const app = express()
app.use(express.json())

const db = require('./models')

// const {Match, Players} = require('./models')

// Route

const router = require('./routes/matchRouter.js')
app.use('/api', router)

const ts = Date.now()
let date_ob = new Date(ts)

app.use((req, res, next) =>{
    console.time('Request')
    console.log(`Method: ${req.method}\nURL: ${req.url}`)

    next();

    console.log('Finish')
    console.timeEnd('Request')
})


// app.get('/matches', (req, res) => {
//     Match.findAll()
//         .then((matches) => {
//         res.send(matches)
//     })
//         .catch((err) => {
//             console.log(err)
//     })
// })
//
// app.get('/insert', (req, res) => {
//     Match.create({
//         map: "de_aztec",
//         max_players: 16,
//         ct_players: 8,
//         t_players: 8,
//         ct_score: 9,
//         t_score: 13,
//         start_time_match: date_ob,
//         is_match_finished: true
//     }).catch(err =>{
//         if (err){
//             console.log(`Error is: ${err}`)
//         }
//     })
//
//     res.send('inserted...')
// })
//
// app.get('/players', (req, res) =>{
//     Players.findAll()
//         .then((players) =>{
//             res.send(players)
//         })
//         .catch((err) => {
//             res.send(`Ooops. Error: ${err}`)
//         })
// })

db.sequelize.sync().then((req) =>{
    app.listen(3000, () =>{
        console.log('Server is running at port: 3000...')
    })
})