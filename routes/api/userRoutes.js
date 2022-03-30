const router = require("express").Router()
const User = require("../../models/User")

router.get("/", async(req,res) => {
    try {
        const userData = await User.findAll()
        res.status(200).json(userData)
    }catch(err) {
        res.status(500).json(err)
    }
})

router.post("/", async(req,res) => {
    try {
        const userData = await User.create(req.body)
        res.status(200).json(userData)  
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get("/:id", async(req,res) => {
    try {
        const userData = await User.findByPk(req.params.id)
        if(!userData) {
            res.status(404).json({message: "No user with that id"})
            return
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
    })

    module.exports = router