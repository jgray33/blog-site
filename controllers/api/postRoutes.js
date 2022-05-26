const router = require("express").Router();
const BlogPost = require("../../models/BlogPost")
const withAuth = require('../../utils/auth')

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

  // api/blog-post/id
  router.delete("/:id", async (req,res) => {
    console.log("Getting to the route delete")
    try {
      const postData = await BlogPost.destroy({
        where: {
          id: req.params.id
        },
      })
      if (!postData) {
        res.status(400).json({ message: "Post does not exist"})
        console.log("No post with that id")
        return
      }
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  })

  // Edit the post
  router.put("/:id", withAuth, async (req,res)=>{
       try{
      const upPost= await BlogPost.update(req.body,{
        where:{
          id:req.params.id
        }
        
      })
      res.status(200).json(upPost)
          }catch(err){
      res.status(400).json(err)
    }
  })

  module.exports = router

