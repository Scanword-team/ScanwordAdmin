const {Router} = require('express')
const router = Router()

let gallery = [{id:0, picture:'/scanword.jpg'}]


// /api/gallery/gallery
router.get(
    '/gallery',
    async (req, res) => {
    try {
        res.status(200).json({gallery: gallery})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
    }
})

// /api/gallery/gallery
router.post(
    '/gallery',
    async (req, res) => {
    try {
        gallery = await req.body.gallery
        console.log(gallery)
        res.status(200).json({gallery: gallery})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
    }
})


module.exports = router