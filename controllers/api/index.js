const router = require('express').Router();

const userRoutes = require('./userRoutes');
const commentRoutes = require("./commentRoutes")
const blogPostRoutes = require("./postRoutes")

router.use('/users', userRoutes);
router.use("/comments",commentRoutes )
router.use("/blog-post", blogPostRoutes)

module.exports = router;
