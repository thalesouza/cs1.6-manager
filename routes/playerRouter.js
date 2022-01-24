const playerController = require('../controllers/playerController')
const matchController = require('../controllers/matchController')
const matchRouter = require('./matchRouter.js')

const router = require('express').Router()

router.post('/player', playerController.addPlayer)

router.get('/player',  playerController.getAllPlayers)
router.get('/player/:id', playerController.checkPlayerInDb, playerController.getOnePlayer)

router.put('/player/:id',
    playerController.checkPlayerInDb,
    playerController.canUpdateUser,
    playerController.checkBodyNickname,
    playerController.updatePlayer
)

router.put('/player/addmatch/:id',
    matchController.finishMatch,
    playerController.addPlayerInMatch)

router.delete('/player/:id',
    playerController.removePlayerFromMatch)


module.exports = router
