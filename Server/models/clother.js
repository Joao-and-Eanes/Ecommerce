const ecommerce = require('../db/conn')

const { DataTypes } = require('sequelize')

const body = {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    describe: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    config = {
        tableName: 'clother'
    }

const clother = ecommerce.define( 'clother', body, config )

// try {
//     clother.sync({ force: true })
// } catch (err) {
//     throw err
// }

module.exports = clother