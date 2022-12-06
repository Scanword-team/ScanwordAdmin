const {Router} = require('express')
const router = Router()

let audio = ['/audio/barbariki.mp3']

// /api/audio/audio
router.get(
    '/audio',
    async (req, res) => {
        try {
            res.status(200).json({audio: audio})
        }
        catch (e) {
            res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
        }
    }
)

// /api/audio/audio
router.post(
    '/audio',
    async (req, res) => {
    try {
        audio = req.body.audio
        res.status(200).json({audio: audio})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
    }
})

module.exports = router