const {Match, Players} = require('../models')

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

const addPointCt = async (req, res) => {
    let points = {
        ct_score: req.body.ct_score,
    }

    const point = await Match.update(points, {where: {ct_score: points.ct_score}})
    res.status(200).send(point)
}

const addPointT = async (req, res) => {
    let points = {
        t_score: req.body.t_score,
    }

    const point = await Match.update(points, {where: {t_score: points.t_score }})
    res.status(200).send(point)
}

const getAllMatches = async (req, res) => {
    let matches = await Match.findAll({})
    res.send(matches)
}

const getOneMatch = async (req, res) => {

    let id = req.params.id
    let matches = await Match.findOne({ where: {idmatch: id}})
    res.send(matches)
}

const updateMatch = async (req, res) => {

    let id = req.params.id

    const match = await Match.update(req.body, {where: {id: id} })

    res.status(200).send(match)
}

const deleteMatch = async (req, res) => {

    let id = req.params.id

    await Match.destroy({where: {id: id}})
}

const liveMatches = async (req, res) => {

    const live = await Match.findAll({where: {is_match_finished: false}})
    res.status(200).send(live)
}

module.exports = {
    addMatch,
    getAllMatches,
    getOneMatch,
    updateMatch,
    deleteMatch,
    liveMatches,
    addPointCt,
    addPointT
}