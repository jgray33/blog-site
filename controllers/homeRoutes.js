const BlogPost = require("../models/BlogPost");
const User = require("../models/User");
const Comment = require("../models/Comment")

const router = require("express").Router();

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
          attributes:["id", "comment_contents", "post_id", "user_id" ],
          include: {
             model: User,
            attributes: ["username"],
        },
        },
      ],
    });
    const posts = blogData.map((post) => post.get({ plain: true }));

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

router.get("/login", async (req, res) => {
  res.render("login");
});



// Get all the data from user with the say is as the session id
router.get("/dashboard", async (req,res) => {
  if (!req.session.logged_in) {
    res.redirect("/login")
    return
  }
  try {
    const postData = await BlogPost.findAll({
      where: {user_id: req.session.user_id},
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{model: User}],
        },
      ],
    })
    const posts = postData.map((post) => post.get({plain:true}))
    res.render("dashboard", {
      posts, 
      logged_in: req.session.logged_in,
      username: req.session.username,
      userId: req.session.user_id
    })
  } catch (err) {
    res.status(500).json.apply(err)
    console.log(err)
  }
})

module.exports = router;
