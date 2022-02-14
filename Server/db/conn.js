const { Sequelize } = require('sequelize')

const { db, config, password, user} = require('./config')

const ecommerce = new Sequelize( db, user, password, config )

try {
    ecommerce.authenticate()
} catch (err) {
    throw err
}

module.exports = ecommerce