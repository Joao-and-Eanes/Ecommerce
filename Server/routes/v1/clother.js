const clotherController = require('../../controllers/clother')

const configMulter = require('../../config/multer')
const { convertImagesToArray } = require('../../utils/image')

const { Joi, Segments, celebrate } = require('celebrate')
const multer = require('multer'),
 upload = multer( configMulter )

module.exports = class ClotherRouter {
    
    static router() {
        const router = require('express').Router()

        router.post( 
            `/create`,
            upload.array(
                'files',
                5
            ),
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    name: Joi.string().required(),
                    describe: Joi.string().required(),
                    sex: Joi.string().required(),
                    price: Joi.number().required(),
                    files: Joi.array().required(),
                    adult: Joi.boolean().required(),
                })
            }),
                this.#createRouter 
        )

        router.post( 
            `/update`,
            upload.array(
                'files',
                5
            ),
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    name: Joi.string(),
                    describe: Joi.string(),
                    sex: Joi.string(),
                    price: Joi.number(),
                    images: Joi.array(),
                    adult: Joi.boolean(),
                    assessmentAverege: Joi.number(),
                    clotherId: Joi.number().integer().required()
                })
            }),
                this.#updateRouter
        )

        router.post( 
            `/delete`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    clotherId: Joi.number().integer().required()
                })
            }),
            this.#deleteRouter
        )

        router.post( 
            `/get-sizes`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    clotherId: Joi.number().integer().required()
                })
            }),
            this.#getSizes
        )

        router.post( 
            `/get-assessments`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    clotherId: Joi.number().integer().required()
                })
            }),
            this.#getAssessments
        )

        router.post( 
            `/get-clother`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    clotherId: Joi.number().integer().required()
                })
            }),
            this.#getClother
        )

        router.get( 
            `/get-all-clother`,
            this.#getAllClother
        )

        router.post( 
            `/get-clother-by-tag`,
            celebrate({
                [Segments.BODY]: Joi.object().keys({
                    name: Joi.string(),
                    describe: Joi.string(),
                    sex: Joi.string(),
                    price: Joi.number(),
                    adult: Joi.boolean(),
                })
            }),
            this.#getClotherByTag
        )

        return router
    }


    /**
     * @param { Request } req 
     * @param { Response } res 
     */
    static async #createRouter( req, res ) {
        const clother = req.body

        clother.images = convertImagesToArray( req.files )

        try {
            await clotherController.create( clother )

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
        const { clotherId, ...clother } = req.body

        clother.images = convertImagesToArray( req.files )
        
        try {
            await clotherController.update( clother, clotherId )

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
        const { clotherId } = req.body

        console.log( clotherId )

        try {
            await clotherController.delete( 1 )

            res.status( 200 ).send({ success: true })
        } catch (err) {
            res.status( 409 ).send({ success: false })
        }
    }

    /**
     * @param { Request } req 
     * @param { Response } res 
     */
    static async #getSizes( req, res ) {
        const { clotherId } = req.body

        try {
            const sizes = await clotherController.getAllSizes( clotherId )

            res.status( 200 ).send({ success: true , sizes })
        } catch (err) {
            res.status( 409 ).send({ success: false, sizes: null })
        }
    }

    /**
     * @param { Request } req 
     * @param { Response } res 
     */
     static async #getAssessments( req, res ) {
        const { clotherId } = req.body

        try {
            const assessments = await clotherController.getAllAssessments( clotherId )

            res.status( 200 ).send({ success: true , assessments })
        } catch (err) {
            res.status( 409 ).send({ success: false, assessments: null })
        }
    }

    /**
     * @param { Request } req 
     * @param { Response } res 
     */
     static async #getClother( req, res ) {
        const { clotherId } = req.body

        try {
            const clother = await clotherController.getClotherById( clotherId )

            res.status( 200 ).send({ success: true , clother })
        } catch (err) {
            res.status( 409 ).send({ success: false, clother: null })
        }
    }

    /**
     * @param { Request } req 
     * @param { Response } res 
     */
     static async #getAllClother( req, res ) {

        try {
            const clothers = await clotherController.getAllClother()

            res.status( 200 ).send({ success: true , clothers })
        } catch (err) {
            res.status( 500 ).send({ success: false, clothers: null })
        }
    }

    /**
     * @param { Request } req 
     * @param { Response } res 
     */
     static async #getClotherByTag( req, res ) {
         const tags = req.body

         console.log( tags )

        try {
            const clothers = await clotherController.getAllClotherByWhere( tags )

            res.status( 200 ).send({ success: true , clothers })
        } catch (err) {
            res.status( 409 ).send({ success: false, clothers: null })
        }
    }
}