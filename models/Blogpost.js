const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blogpost extends Model {}

Blogpost.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  blog_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contents: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  creator_username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
{
    sequelize,
    freezeTableName: true,
    underscored:true,
    timestamps: true,
    modelName: "blogPost"
}
);

module.exports = Blogpost