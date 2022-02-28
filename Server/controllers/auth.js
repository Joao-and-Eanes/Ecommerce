const strategyJWT = require('passport-jwt').Strategy,
    extractJWT = require('passport-jwt').ExtractJwt

const apiManeger = require('../maneger/api')

const userController = require('../controllers/user')

const { comparePassword } = require('../utils/bcrypt')
const passport = require('passport')

module.exports = class AuthController {
    static #config( passport ) {
        this.#createStrategy( passport )
    }

    static #createSession( passport ) {

        passport.deserializeUser( async ( id, done ) => {
            try {
                const user = await userController.getUserById( id )

                done( null, user )
            } catch (err) {
                done( err )
            }
        })

        
        passport.serializeUser(( user, done ) => {
            done( null, user.id )
        })

    }

    static #createStrategy( passport ) {
        const options = {
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.PASSPORT_KEY,
        }

        const strategy = async ( jwt_payload, done ) => {
            console.log( jwt_payload )
            try {
                const { id, ...user } = await userController.getUserById( jwt_payload.id )

                if( user ) return done( null, { id } )

                done( new Error('error fetching user in database') )
            } catch (err) {
                done( err )
            }
        }

        passport.use( new strategyJWT( options, strategy ))
    }


    static authenticate() {
        const apiManeger = require('../maneger/api'),
            passsport = apiManeger.getPassport()

        this.#config( passport )

        return passport.authenticate('jwt', { session: false })
    }
}