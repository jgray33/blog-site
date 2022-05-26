const BlogPost = require("../models/BlogPost");
const User = require("../models/User");
const Comment = require("../models/Comment");
const withAuth = require("../utils/auth");

const router = require("express").Router();

// Get all the posts
router.get("/", async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_contents", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const posts = blogData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      userId: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
  }
});

// Get one post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const onePost = BlogPost.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: "password" } },
        {
          model: Comment,
          include: [{ model: User, attributes: { exclude: "password" } }],
        },
      ],
    });
    if (onePost) {
      const post = (await onePost).get({ plain: true });
      return res.render("singlePost", { post, userId: req.session.userId, logged_in: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  }
  res.render("signup");
});

// Get all the data from user with the same as the session id
router.get("/dashboard", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try {
    const postData = await BlogPost.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User }],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts-dashboard", {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      userId: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json.apply(err);
    console.log(err);
  }
});

module.exports = router;
