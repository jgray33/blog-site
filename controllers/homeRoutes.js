const Blogpost = require("../models/Blogpost")

const router = require("express").Router()

router.get("/", async(req,res)=> {
        const blogData = await Blogpost.findAll().catch((err) => {
            console.log(err)
        })
    const blogs = blogData.map((blog) => blog.get({plain:true}))
    res.render("homepage", {blogs})
    
})

router.get("/login", async(req,res) => {
    res.render("login")
})

module.exports = router