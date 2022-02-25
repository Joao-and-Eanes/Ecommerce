const ecommerce = require('../db/conn')
const clother = require('../models/clother')

const { DataTypes } = require('sequelize')

const body = {
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shoulder: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    length: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    sleeve: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    bust: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
},
    config = {
        tableName: 'size'
    }

const size = ecommerce.define( 'size', body, config )

const option = { 
    constraints: true,
    foreignKey: 'clotherId'
}

size.belongsTo( clother, option )
clother.hasMany( size, option )

// try {
//     size.sync({ force: true })
// } catch (err) {
//     throw err
// }

module.exports = size