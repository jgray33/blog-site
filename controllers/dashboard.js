const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
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

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_title", "post_contents", "user_id", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_contents", "user_id", "post_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!postData) {
      console.log("no post data");
      return;
    }
    // console.log(postData)
    const post = postData.get({ plain: true });
    
        res.render("edit-post", {
      post,
      logged_in: true,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
