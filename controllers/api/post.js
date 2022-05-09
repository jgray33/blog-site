
const router = require("express").Router();
const BlogPost = require("../../models/BlogPost")

router.post("/", async (req, res) => {
    try {
      const blogData = await BlogPost.create({
        post_title: req.body.blogTitle,
        post_contents: req.body.blogContent,
        user_id: req.session.user_id,
      });
      console.log(blogData)
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = router

