const matchController = require('../controllers/matchController')

const router = require('express').Router()

router.post('/matches',  matchController.addMatch)

router.get('/matches', matchController.getAllMatches)
router.get('/matches/orderByTime', matchController.getMatchesByTime)

router.get('/live', matchController.liveMatches)


router.get('/matches/:id', matchController.getOneMatch)
router.put('/matches/:id', matchController.matchBalance, matchController.updateMatch)
router.delete('/matches/:id', matchController.deleteMatch)

router.put('/matches/:id/ct', matchController.addPointCt)
router.put('/matches/:id/t', matchController.addPointT)


module.exports = router
