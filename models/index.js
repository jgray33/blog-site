const User = require("./User")
const Blog_post = require("./Blog_post")
const Comment = require("./Comment")

User.hasMany(Blog_post, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
})

User.hasMany(Comment, {
    foreignKey: "comment_id",
    onDelete: "CASCADE"
})

Blog_post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
})

Comment.belongsTo(Blog_post, {
    foreignKey: "post_id"
})

Blog_post.belongsTo(User, {
    foreignKey: "user_id"
})

Comment.belongsTo(User, {
    foreignKey: "user_id"
})

module.exports = { User, Comment, Blog_post}