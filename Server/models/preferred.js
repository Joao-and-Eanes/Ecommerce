const ecommerce = require('../db/conn')
const user = require('../models/user')

const { DataTypes } = require('sequelize')

const body = {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageKey: {
        type: DataTypes.JSON,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    clotherId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    config = { tableName: 'preferred' }

const preferred = ecommerce.define( 'preferred', body, config )

const option = { 
    constraints: true,
    foreignKey: 'userId'
}

user.hasMany( preferred, option )
preferred.belongsTo( user, option )

// try {
//     preferred.sync({ force: true })
// } catch (err) {
//     throw err
// }

module.exports = preferred