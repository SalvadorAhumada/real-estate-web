//importing modules
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@` +
    `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { dialect: "postgres" })

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./UserModel')(sequelize, DataTypes)

//exporting the module
module.exports = db