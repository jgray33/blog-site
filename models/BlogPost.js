const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blogpost extends Model {}

Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    // freezeTableName: true,
    // underscored: true,
    // timestamps: false,
    // modelName: "blog_post",
  }
);

module.exports = BlogPost;
