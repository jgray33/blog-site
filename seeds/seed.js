const sequelize = require("../config/connection");
const Blogpost = require("../models/Blogpost");
const User = require("../models/User");

const blogData = require("./blogpost-seeds.json");
const userData = require("./users-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ alter: true });
  console.log("here");

  await Blogpost.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
