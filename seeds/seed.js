const sequelize = require("../config/connection");
const Blog_post = require("../models/Blog_post");
const User = require("../models/User");
// const Comment = require("../models/Comment")

const blogData = require("./blog_post-seeds.json");
const userData = require("./users-seeds.json");
// const commentData = require("./comment-seed.json")

const seedDatabase = async () => {
  await sequelize.sync();


    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const blog of blogData) {
      await Blog_post.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    // for (const comment of commentData) {
    //   await Comment.create({
    //     ...comment,
    //     user_id: users[Math.floor(Math.random() * users.length)].id,
    //   });
    // }


  
    process.exit(0);
  }

seedDatabase();
