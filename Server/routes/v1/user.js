const userControllers = require('../../controllers/user')

const { createHash } = require('../../utils/bcrypt')

const { Joi, Segments, celebrate } = require('celebrate')

module.exports = class AddressRouter {

    static router() {
        const router = require('express').Router()

        router.post( 
            `/create`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    tell: Joi.number().integer(),
                    adm: Joi.boolean(),
                })
            }),
                this.#createRouter 
        )

        router.post( 
            `/update`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    name: Joi.string(),
                    email: Joi.string(),
                    password: Joi.string(),
                    tell: Joi.number(),
                    adm: Joi.boolean(),
                    userId: Joi.number().integer().required()
                })
            }),
                this.#updateRouter 
        )

        router.post( 
            `/delete`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    userId: Joi.number().integer().required()
                })
            }),
            this.#deleteRouter
        )

        return router
    }


    /**
     * @param { Request } req 
     * @param { Response } res 
     */
    static async #createRouter( req, res ) {
        const { password, ...user } = req.body

        const passwordCrypt = createHash( password )

        try {
            await userControllers.create({ password: passwordCrypt, ...user })

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }

    static async #updateRouter( req, res ) {
        const { userId, password, ...data } = req.body,
            newData = { ...data }

        if( password ) newData.password = createHash( password )
        
        try {
            await userControllers.update( newData, userId )

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }

    /**
     * @param { Request } req 
     * @param { Response } res 
     */
    static async #deleteRouter( req, res ) {
        const { userId } = req.body

        try {
            await userControllers.delete( userId )

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }
}