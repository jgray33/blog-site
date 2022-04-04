const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog_post extends Model {}

Blog_post.init(
  {
    post_id: {
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
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    modelName: "blog_post",
  }
);

module.exports = Blog_post;
