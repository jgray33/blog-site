const User = require("./User")
const Blogpost = require("./BlogPost")
const Comment = require("./Comment")

BlogPost.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

BlogPost.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
})


Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

module.exports = { User, Comment, BlogPost}