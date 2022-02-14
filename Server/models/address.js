const ecommerce = require('../db/conn')
const users = require('../models/user')

const { DataTypes } = require('sequelize')

const body = {
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}

const address = ecommerce.define( 'address', body, { tableName: 'address' } )

users.hasMany( address, { foreignKey: 'userId'} )
address.belongsTo( users, { foreignKey: 'userId'} )

// try {
//     address.sync({ force: true })
// } catch (err) {
//     throw err
// }

module.exports = address