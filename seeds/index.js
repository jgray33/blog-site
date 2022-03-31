const seedBlogData = require("./blogpost-seeds")
const sequelize = require("../config/connection")

const seedAll = async () => {
    await sequelize.sync({force:true})
    await seedBlogData()
    console.log('\n----- BlogData -----\n');

    process.exit(0)
}

seedAll()