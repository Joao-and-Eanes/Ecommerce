const ecommerce = require('../db/conn')

const { DataTypes } = require('sequelize')

const user = require('./user')
const clother = require('./clother')

const body = {
    coment: {
        type: DataTypes.TEXT,
    },
    assessment: {
        type: DataTypes.INTEGER,
    }
},
    config = {
        tableName: 'assessment'
    }

const assessment = ecommerce.define( 'assessment', body, config )

const optionUser = { 
    foreignKey: 'userId',
    constraints: true
},
    optionClother = { 
        constraints: true,
        foreignKey: 'clotherId'
    } 

assessment.belongsTo( user, optionUser )
assessment.belongsTo( clother, optionUser )

clother.hasMany( assessment, optionClother )
user.hasMany( assessment, optionUser )

// try {
//     assessment.sync({ force: true })
// } catch (err) {
//     throw err
// }

module.exports = assessment