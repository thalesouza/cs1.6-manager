const playerController = require('../controllers/playerController')
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


module.exports = router
