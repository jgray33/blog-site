const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts with auth
router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      where: { user_id: req.session.user_id },
    });
    const posts = blogData.map((blog) => blog.get({ plain: true }));
    res.render("all-posts-dashboard", {
      posts,
    });
    console.log(posts);
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

// Get one post
// dashboard/post/id
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    console.log("getting here");
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
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    if (!postData) {
      console.log("no post data");
      return;
    }
    // console.log(postData)
    const post = postData.get({ plain: true });

    res.render("singlePostEditDelete", {
      post,
      logged_in: true,
      user_id: req.session.user_id,
      username: req.session.username,
      sessionID,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
