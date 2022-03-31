const Blogpost = require("../models/Blogpost");

const blogData = [
  {
    blog_title: "Arrays are over array-ted",
    contents:
      "I have been thinking about this a lot and I have come to the conclusion that arrays are not worth the disk-space they are written on",
    creator_username: "jgray33",
  },
  {
    blog_title: "Javascript? More like palavascript!",
    contents:
      "Javascript is a pain in the ass and I will challenge anyone who tells me otherwise",
    creator_username: "jules",
  },
  {
    blog_title: "I cannot function with all these functions",
    contents:
      "If I was to give you any advice when starting out learning to code I would say learn how to implement functions ",
    creator_username: "julseygee",
  },
];

const seedBlogData = () => Blogpost.bulkCreate(blogData);

module.exports = seedBlogData;
