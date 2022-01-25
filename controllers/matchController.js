const {Op} = require("sequelize")
const {Match, Players} = require('../models')


const addMatch = async (req, res) => {
    let stats = {
        map: req.body.map,
        max_players: req.body.max_players,
        ct_players: req.body.ct_players,
        t_players: req.body.t_players,
        ct_score: req.body.ct_score,
        t_score: req.body.t_score,
        start_time_match: Date.now(),
        endMatch: Date.now() + 240000
    }

    const match = await Match.create(stats)
    res.status(200).send(match)
}

const getAllMatches = async (req, res) => {
    let matches = await Match.findAll({})
    res.send(matches)
}

const getMatchesByTime = async (req, res) => {
    let matches = await Match.findAll({order: [
        ['start_time_match']
        ]})
    res.send(matches)
}

const getOneMatch = async (req, res) => {

    let id = req.params.id

    let matches = await Match.findOne({ where: {idmatch: id}})
    res.send(matches)
}

const updateMatch = async (req, res) => {

    let id = req.params.id

    const match = await Match.update(req.body, {where: {idmatch: id} })

    res.status(200).send(match)
}

const deleteMatch = async (req, res) => {

    let id = req.params.id

    await Match.destroy({where: {idmatch: id}})
    res.end()
}

const liveMatches = async (req, res) => {

    const live = await Match.findAll({where: {is_match_finished: false}})
    if (live.length === 0){
        return res.status(200).send('There is no match live.')
    }
    res.status(200).send(live)
}

const addPointCt = async (req, res) => {
    let id = req.params.id

    for (let i in req.body){
        if (i !== 'ct_score'){
            return res.status(400).send('Watch out Cabrón! You can only add ct_score.')
        }
    }

    const point = await Match.update(req.body, {where: {idmatch: id}})
    res.status(200).send(point)
}

const addPointT = async (req, res) => {
    let id = req.params.id

    for (let i in req.body){
        if (i !== 't_score'){
            return res.status(400).send('Watch out Cabrón! You can only add t_score.')
        }
    }


    const point = await Match.update(req.body, {where: {idmatch: id }})
    res.status(200).send(point)
}

const matchBalance = async (req, res, next) => {
    let id = req.params.id

    let ctPlayers = 0
    let tPlayers = 0
    const players = await Match.findAll({where:
            {[Op.and]: [
                    {ct_players: {
                        [Op.gt]: 0
                        }},
                    {t_players: {
                        [Op.gt]: 0
                        }},
                    {idmatch: id}
                ]
                }})
    for (let i of players){
        ctPlayers = i.ct_players
        tPlayers = i.t_players
    }

    for (let c in req.body){
        if (c === 'ct_players'){
            if (req.body.ct_players > tPlayers + 1){
                return res.status(400).send('Cannot add CT. It will unbalance the match.')
            }
        }
    }
    for (let t in req.body){
        if(t === 't_players'){
            if(req.body.t_players > ctPlayers + 1){
                return res.status(400).send('Cannot add T. It will unbalance the match.')
            }
        }
    }

    next()
}

const finishMatch = async (req, res, next) => {
    let id = req.params.id
    const match = req.body.id_match

    const liveMatches = await Match.findAll({where: {
        [Op.and]: [
            {idmatch: match},
            {is_match_finished: false}
        ]
        }})
    let scoreCt = 0
    let scoreT = 0
    let endMatch

    for (let i of liveMatches){
        scoreCt = (i.ct_score)
        scoreT = (i.t_score)
        endMatch = i.endMatch
    }

    if(scoreCt === 16 || scoreT === 16 || Date.now() >= endMatch){
        for (let i of liveMatches){
            i.is_match_finished = true
            const updateBoolean = {
                "is_match_finished": true
            }
            Match.update(updateBoolean, {where: {idmatch: id}})
            console.log(i.is_match_finished)
        }
        return res.status(400).send('Match is over. Cannot add player to the match.')
    }

    next()
}

setInterval(async () => {
    const liveMatches = await Match.findAll({where: {is_match_finished: false}})

    const forceEnd = {
        "is_match_finished": true
    }

    for (i of liveMatches){
        if (Date.now() >= i.endMatch){
            console.log(`Match id: ${i.idmatch} is over!`)
            await Match.update(forceEnd, {where: {idmatch: i.idmatch}})
        }
        if (i.ct_score >= 16 | i.t_score >= 16){
            console.log(`Match id: ${i.idmatch} is over!`)
            await Match.update(forceEnd, {where: {idmatch: i.idmatch}})
        }
    }

}, 60000)


module.exports = {
    addMatch,
    getAllMatches,
    getMatchesByTime,
    getOneMatch,
    updateMatch,
    deleteMatch,
    liveMatches,
    addPointCt,
    addPointT,
    matchBalance,
    finishMatch
}