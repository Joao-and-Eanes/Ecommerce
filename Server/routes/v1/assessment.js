const assessmentController = require('../../controllers/assessment')

const { Joi, Segments, celebrate } = require('celebrate')

module.exports = class AddressRouter {

    static router() {
        const router = require('express').Router()

        router.post( 
            `/create`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    coment: Joi.string().required(),
                    assessment: Joi.number().integer().required(),
                    userId: Joi.number().integer().required(),
                    clotherId: Joi.number().integer().required()
                })
            }),
                this.#createRouter 
        )

        router.post( 
            `/update`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    coment: Joi.string(),
                    assessment: Joi.number().integer(),
                    assessmentId: Joi.number().integer().required()
                })
            }),
                this.#updateRouter
        )

        router.post( 
            `/delete`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    assessmentId: Joi.number().integer().required()
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
        const { clotherId, userId, ...assessment } = req.body

        try {
            await assessmentController.create( assessment, userId, clotherId )

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
        const { assessmentId, ...assessment } = req.body

        try {
            await assessmentController.update( assessment, assessmentId )

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
        const { assessmentId } = req.body

        try {
            await assessmentController.delete( assessmentId )

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }
}