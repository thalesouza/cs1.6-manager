const {Players} = require('../models')

const addPlayer = async (req, res) => {
    let data = {
        nickname: req.body.nickname,
        kills: req.body.kills,
        deaths: req.body.deaths,
        mvps: req.body.mvps,
        ping: req.body.ping
    }

    const player = await Players.create(data)
    res.status(200).send(player)
}

const getAllPlayers = async (req, res) => {

    let player = await Players.findAll({})

    res.send(player)
}

const getOnePlayer = async (req, res) => {

    let id = req.params.id

    let player = await Players.findOne({where: {idPlayer: id}})

    res.send(player)
}

const updatePlayer = async (req, res) => {

    let id = req.params.id

    const player = await Players.update(req.body, {where: {idPlayer: id} })

    res.status(200).send(player)
}

// middlewares

const checkPlayerInDb = async (req, res, next) => {
    let id = req.params.id
    const players = await Players.findOne({where: {idPlayer: id}})

    // checks if player exists
    if (players === Object || players === null){
        return res.status(400).send("Uhm.. I think that this player is not here.")
    }


    // req.player = player
    // res.status(200).send(player)
    next()
}

const checkBodyNickname = async (req, res, next) => {
    let id = req.params.id
    const players = await Players.findOne({where: {idPlayer: id}})
    let player


    for (let p in req.body){
        if(p === 'nickname'){
            player = req.body.nickname
        }
    }
    if (!player){
        return res.status(400).send('Yoo! Put the nickname there bro...')
    }

    next()
}

const canUpdateUser = async (req, res, next) => {
    let id = req.params.id
    const players = await Players.findOne({where: {idPlayer: id}})

    if (players.id_match === null){
        return res.status(400).send('You can not change this player because it is not playing.')
    }
    console.log('showing players again:\n' + players + '\nAnd here in match' + players.in_match)
    next()

}

module.exports = {
    addPlayer,
    getAllPlayers,
    getOnePlayer,
    updatePlayer,
    checkPlayerInDb,
    checkBodyNickname,
    canUpdateUser
}