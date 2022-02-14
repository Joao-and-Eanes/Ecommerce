module.exports = {
    db: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    config: {
        host: process.env.HOST,
        dialect: 'mysql'
    },
}