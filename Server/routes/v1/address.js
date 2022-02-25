const addressController = require('../../controllers/address')

const { Joi, Segments, celebrate } = require('celebrate')

module.exports = class AddressRouter {

    static router() {
        const router = require('express').Router()

        router.post( 
            `/create`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    district: Joi.string().required(),
                    complement: Joi.string().required(),
                    state: Joi.string().required(),
                    street: Joi.string().required(),
                    cep: Joi.number().required(),
                    number: Joi.number().required(),
                    userId: Joi.number().required()
                })
            }),
                this.#createRouter 
        )

        router.post( 
            `/update`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    district: Joi.string(),
                    complement: Joi.string(),
                    state: Joi.string(),
                    street: Joi.string(),
                    cep: Joi.number(),
                    number: Joi.number(),
                    addressId: Joi.number().required()
                })
            }),
                this.#updateRouter
        )

        router.post( 
            `/delete`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    addressId: Joi.number().required()
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
        const { userId, ...address } = req.body

        try {
            await addressController.create( address, userId )

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
        const { addressId, ...address } = req.body

        try {
            await addressController.update( address, addressId )

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
        const { addressId } = req.body

        try {
            await addressController.delete( addressId )

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }
}