const ecommerce = require('../db/conn')
const clother = require('../models/clother')

const { DataTypes } = require('sequelize')

const body = {
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shoulder: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sleeve: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bust: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    config = {
        tableName: 'size'
    }

const size = ecommerce.define( 'size', body, config )

const option = { foreignKey: 'clotherId' }

clother.hasMany( size, option )
size.belongsTo( clother, option )

// try {
//     size.sync({ force: true })
// } catch (err) {
//     throw err
// }

module.exports = size