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

user.hasMany( assessment, { foreignKey: 'userId' } )
assessment.belongsTo( user, { foreignKey: 'userId' })

clother.hasMany( clother, { foreignKey: 'clotherId' } )
assessment.belongsTo( clother, { foreignKey: 'clotherId' } )

// try {
//     assessment.sync({ force: true })
// } catch (err) {
//     throw err
// }

module.exports = assessment