const sequelize = require("../config/connection");
const Blogpost = require("../models/Blogpost");

const blogData = require("./blogpost-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Blogpost.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase()