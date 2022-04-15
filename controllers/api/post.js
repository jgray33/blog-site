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


