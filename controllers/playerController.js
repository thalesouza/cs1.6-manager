const {Op} = require("sequelize")
const {Players, Match} = require('../models')


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

const addPlayerInMatch = async (req, res, next) => {
    const id = req.params.id

    // Get idmatch from body
    let idFromMatch;
    for (let i in req.body){
        if (i === "id_match"){
            idFromMatch = req.body.id_match
        }
    }

    // Validate if match is finished
    const isThisMatchFinished = await Match.findAll({
        where: {
            [Op.and]: [
                {idmatch: idFromMatch},
                {is_match_finished: true}
            ]}
    })
    for (let i of isThisMatchFinished){
        if (i.is_match_finished === true){
            return res.status(400).send('Match is over. Cannot add player!')
        }
    }


    // Get ct and t already playing
    const isMatchFull = await Match.findAll({where: {idmatch: idFromMatch}})
    let ctPlayers, tPlayers, maxPlayers
    for (let j of isMatchFull) {
        maxPlayers = j.max_players
        ctPlayers = j.ct_players
        tPlayers = j.ct_players
    }
    let playersInMatch = ctPlayers + tPlayers
    if (playersInMatch > maxPlayers){
        return res.status(400).send('Match is full! Try again later.')
    }

    if (Object.keys(req.body).length > 1 || Object.keys(req.body).length === 0){
        return res.status(400).send('You can only add match here.')
    } else{
        for (let i in req.body){
            if (i === "id_match"){
                const addingMatch = await Players.update(req.body, {where: {idPlayer: id}})
                res.status(200).send(addingMatch)
            }
        }
    }

    next()
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

const removePlayerFromMatch = async (req, res) => {
    let id = req.params.id
    const player = await Players.update({
        "id_match": 0
    }, {where: {idPlayer: id}})

    res.status(200).send('Player removed from match.')
}

// checkers

const checkPlayerInDb = async (req, res, next) => {
    let id = req.params.id
    const players = await Players.findOne({where: {idPlayer: id}})

    // checks if player exists
    if (players === Object || players === null){
        return res.status(400).send("Uhm.. I think that this player is not here.")
    }


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

    if (players.id_match === 0 || players.id_match === null){
        return res.status(400).send('You can not change this player because it is not playing.')
    }
    next()

}

let getOverPing = []

setInterval(async () =>{
    const getPlayersInMatch = await Players.findAll({where: {
        id_match: {
            [Op.gt]: 0
        }
        }})
    const removePlayerFromMatch = {
        "id_match": 0
    }

    const count = (arr, value) => {
        let count = 0
        for (let i = 0; i < arr.length; i++){
            if(arr[i] === value){
                count++
            }
        }
        return count
    }

    for (let i = 0; i < getPlayersInMatch.length; i++){
        if(getPlayersInMatch[i].ping > 100){
            getOverPing.push(getPlayersInMatch[i].idPlayer)
        }

        if (count(getOverPing, getPlayersInMatch[i].idPlayer) >= 2){
            await Players.update(removePlayerFromMatch, {where: {idPlayer: getPlayersInMatch[i].idPlayer}})
            getOverPing.shift()
            getOverPing.pop()
        }
    }


}, 60000)

module.exports = {
    addPlayer,
    addPlayerInMatch,
    getAllPlayers,
    getOnePlayer,
    updatePlayer,
    removePlayerFromMatch,
    checkPlayerInDb,
    checkBodyNickname,
    canUpdateUser
}