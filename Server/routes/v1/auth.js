const authController = require('../../controllers/auth')
const userController = require('../../controllers/user')

const { comparePassword } = require('../../utils/bcrypt')
const { createToken } = require('../../utils/jwt')

const { Joi, Segments, celebrate } = require('celebrate')

module.exports = class AuthRouter {

    static router() {
        const router = require('express').Router()

        router.post( 
            `/token`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }),
                this.#tokenRouter 
        )

        router.get( 
            `/get-user`,
            celebrate({
                [ Segments.HEADERS ]: Joi.object({
                    authorization: Joi.string().required()
                }).unknown()
            }),
            authController.authenticate(),
            this.#getUserRouter
        )

        return router
    }


    /**
     * @param { Request } req 
     * @param { Response } res 
     */
    static async #tokenRouter( req, res ) {
        const { password, email } = req.body

        try {
            const user = await userController.getUserByWhere({ email })

            if( user ) {
                const passwordOk = comparePassword( password, user.password )

                if( passwordOk ) {
                    const token = `Bearer ${createToken( { id: user.id } )}`

                    return res.status( 200 ).send({ success: true, token })
                }

                return res.status( 409 ).send({ success: true, token: null })
            }

            return res.status( 409 ).send({ success: true, token: null })
        } catch (err) {
            res.status( 409 ).send({ success: false, token: null })
        }
    }

    /**
     * @param { Request } req 
     * @param { Response } res 
     */
    static async #getUserRouter( req, res ) {
        const { id } = req.user

        try {
            const user = await userController.getUserById( id )

            if( user )  return res.status( 200 ).send({ success: true, user })

            return res.status( 409 ).send({ success: true, user: null })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }
}