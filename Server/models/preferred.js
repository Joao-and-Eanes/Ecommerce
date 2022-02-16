const ecommerce = require('../db/conn')
const user = require('../models/user')

const { DataTypes } = require('sequelize')

const body = {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageKey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    option = { tableName: 'preferred' }

const preferred = ecommerce.define( 'preferred', body, option )

user.hasMany( preferred, { foreignKey: 'userId' } )
preferred.belongsTo( user, { foreignKey: 'userId' } )

// try {
//     preferred.sync({ force: true })
// } catch (err) {
//     throw err
// }

module.exports = preferred