const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')

module.exports = class ApiManeger {
    static initialize( app ) {
        app.use( session({ 
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 30 * 60 * 1000 }
        }) )
        app.use( passport.initialize() )
        app.use( passport.session() )

        app.use( cors() )

        app.use( express.urlencoded({ extended: false }) )
        app.use( express.json() )
    }

    static getPassport() {
        return passport
    }
}