const router = require("express").Router();
const { Blogpost, BlogPost } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blogpost.findAll({
      where: { user_id: req.session.user_id },
    });
    const posts = blogData.map((blog) => blog.get({ plain: true }));
    res.render("dashboard", {
      posts,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const blogData = await BlogPost.create({
      post_title: req.body.blogTitle,
      post_contents: req.body.blogContent,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
