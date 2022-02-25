const sizeController = require('../../controllers/size')

const { Joi, Segments, celebrate } = require('celebrate')

module.exports = class AddressRouter {

    static router() {
        const router = require('express').Router()

        router.post( 
            `/create`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    size: Joi.string().required(),
                    complement: Joi.number().integer().required(),
                    shoulder: Joi.number().integer().required(),
                    length: Joi.number().integer().required(),
                    sleeve: Joi.number().integer().required(),
                    bust: Joi.number().integer().required(),
                    clotherId: Joi.number().integer().required()
                })
            }),
                this.#createRouter 
        )

        router.post( 
            `/update`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    size: Joi.string(),
                    shoulder: Joi.number().integer(),
                    length: Joi.number().integer(),
                    sleeve: Joi.number().integer(),
                    bust: Joi.number().integer(),
                    sizeId: Joi.number().integer().required()
                })
            }),
                this.#updateRouter
        )

        router.post( 
            `/delete`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    sizeId: Joi.number().integer().required()
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
        const { clotherId, ...size } = req.body

        try {
            await sizeController.create( size, clotherId )

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }

    /**
     * @param { Request } req 
     * @param { Response } res 
     */
    static async #updateRouter( req, res ) {
        const { sizeId, ...size } = req.body

        try {
            await sizeController.update( size, sizeId )

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
        const { sizeId } = req.body

        try {
            await sizeController.delete( sizeId )

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }
}