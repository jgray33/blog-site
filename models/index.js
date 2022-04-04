const User = require("./User")
const Blog_post = require("./Blog_post")
const Comment = require("./Comment")

Blog_post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Blog_post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
})


Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

module.exports = { User, Comment, Blog_post}