const {Match} = require('../models')

const addMatch = async (req, res) => {
    let stats = {
        map: req.body.map,
        max_players: req.body.max_players,
        ct_players: req.body.ct_players,
        t_players: req.body.t_players,
        ct_score: req.body.ct_score,
        t_score: req.body.t_score,
        start_time_match: Date.now()
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


module.exports = {
    addMatch,
    getAllMatches,
    getMatchesByTime,
    getOneMatch,
    updateMatch,
    deleteMatch,
    liveMatches,
    addPointCt,
    addPointT
}