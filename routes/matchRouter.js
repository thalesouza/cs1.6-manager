const matchController = require('../controllers/matchController')

const router = require('express').Router()

router.post('/matches',  matchController.addMatch)

router.get('/matches', matchController.getAllMatches)

router.get('/live', matchController.liveMatches)

router.get('/matches/:id ', matchController.getOneMatch)
router.put('/matches/:id', matchController.updateMatch)
router.delete('/matches/:id', matchController.deleteMatch)
router.put('/matches/ct/:id', matchController.addPointCt)
router.put('/matches/t/:id', matchController.addPointT)


module.exports = router
