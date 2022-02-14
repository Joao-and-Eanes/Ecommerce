const { DataTypes } = require('sequelize')

const ecommerce = require('../db/conn')

const body = {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tell: {
        type: DataTypes.INTEGER
    },
    adm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    config = {
        tableName: 'users',
        freezeTableName: true
    }

const user = ecommerce.define( 'users', body,  config)

// try {
//     user.sync({ force: true })
// } catch (err) {
//     throw err.sql
// }

module.exports = user