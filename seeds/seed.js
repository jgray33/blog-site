const sequelize = require("../config/connection");
const Blog_post = require("../models/Blog_post");
const User = require("../models/User");
const Comment = require("../models/Comment")

const blogData = require("./blog_post-seeds.json");
const userData = require("./users-seeds.json");
const commentData = require("./comment-seed.json")

const seedDatabase = async () => {
  await sequelize.sync({ force: alter });


    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const blog of blogData) {
      await Blog_post.create({
        ...blog
      });
    }

    for (const comment of commentData) {
      await Comment.create({
        ...comment
      });
    }
  
    process.exit(0);
  }

seedDatabase();
