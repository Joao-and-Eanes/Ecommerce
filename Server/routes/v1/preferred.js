const preferredController = require('../../controllers/preferred')
const clotherController = require('../../controllers/clother')

const { Joi, Segments, celebrate } = require('celebrate')

module.exports = class AddressRouter {

    static router() {
        const router = require('express').Router()

        router.post( 
            `/create`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    clotherId: Joi.number().integer().required(),
                    userId: Joi.number().integer().required()
                })
            }),
                this.#createRouter 
        )

        router.post( 
            `/delete`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    preferredId: Joi.number().integer().required()
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
        const { clotherId, userId } = req.body

        try {
            const images = await clotherController.getArrayImagesByClotherId( clotherId ),
                { name, price } = await clotherController.getClotherById( clotherId ),
                size = { 
                    name, 
                    price, 
                    clotherId, 
                    imageKey: JSON.stringify( images )
                }
            
            await preferredController.create( size, userId )

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
        const { preferredId } = req.body

        try {
            await preferredController.delete( preferredId )

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }
}