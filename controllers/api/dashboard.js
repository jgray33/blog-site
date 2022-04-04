const router = require("express").Router()
const { Blogpost } = require("../../models")
const withAuth = require("../../utils/auth")


router.get("/", withAuth, async (req,res) => {
    try {
        const blogData = await Blogpost.findAll({
            where: { user_id: req.session.user_id}
        })
        const posts = blogData.map((blog) => blog.get({plain: true}))
        res.render("dashboard", {
            posts
        })
    }catch (err) {
        console.log(err)
    }
})