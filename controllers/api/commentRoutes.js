const router = require("express").Router();
const Comment = require("../../models/Comment");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    commentData = await Comment.findAll();
    res.status(200).json(commentData);
    console.log(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_contents: req.body.comment,
      user_id: req.session.user_id,
    });
    console.log(commentData);
    res.status(400).json(commentData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res.status(400).json({ message: "Comment doesn't exist" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
