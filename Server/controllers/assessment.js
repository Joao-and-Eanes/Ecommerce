const assessmentModel = require('../models/assessment')
const userModel = require('../models/user')

const clotherController = require('../controllers/clother')

module.exports = class AssessmentController {
    static async create( assessment, userId, clotherId ) {
        this.#checkParam( assessment, 'object', 'create' )
        this.#checkParam( userId, 'number', 'create' )
        this.#checkParam( clotherId, 'number', 'create' )

        try {
            const getAssessments = ( acu, elem ) => elem.assessment + acu

            const assessmentOfClother = await clotherController.getAllAssessments( clotherId ),
                sumTotalOfAssessment = assessmentOfClother.reduce( getAssessments, 0 ),
                assessmentLength = assessmentOfClother.length,
                avaregeRatings = sumTotalOfAssessment / assessmentLength <= 5 ? assessmentLength : 5
            
            await assessmentModel.create( { ...assessment, userId, clotherId } )

            clotherController.update({ assessmentAverege: avaregeRatings }, clotherId )
        } catch (err) {
            throw err
        }
    }

    static delete( assessmentId ) {
        this.#checkParam( assessmentId, 'number', 'delete' )

        try {
            const option = { where: { id: assessmentId } }

            assessmentModel.destroy( option )
        } catch (err) {
            throw err
        }
    }

    static update( newData, assessmentId ) {
        this.#checkParam( newData, 'object', 'update' )
        this.#checkParam( assessmentId, 'number', 'update' )

        try {
            const option = { where: { id: assessmentId }}
            assessmentModel.update( newData, option )
        } catch (err) {
            throw err
        }
    }

    static async getAssessmentById( assessmentId ) {
        this.#checkParam( assessmentId, 'number', 'getAssessmentById' )

        try {
            const option = { where: { id: assessmentId }, raw: true, nest: true }

            const assessment = await assessmentModel.findOne( option )

            return assessment
        } catch (err) {
            throw err
        }
    }

    static async getAssessmentByWhere( where ) {
        this.#checkParam( where, 'object', 'getAssessmentByWhere' )

        try {
            const option = { where, raw: true, nest: true }

            const assessment = await assessmentModel.findOne( option )

            return assessment
        } catch (err) {
            throw err
        }
    }

    static async getAllAssessmentByUserId( userId ) {
        this.#checkParam( userId, 'number', 'getAllAssessmentByUserId' )

        try {
            const option = { where: { userId }, raw: true, nest: true }

            const assessment = await assessmentModel.findAll( option )

            return assessment
        } catch (err) {
            throw err
        }
    }

    static async getAllAssessmentByClotherId( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getAllAssessmentByClotherId' )

        try {
            const option = { where: { clotherId }, raw: true, nest: true }

            const assessment = await assessmentModel.findAll( option )

            return assessment
        } catch (err) {
            throw err
        }
    }

    static async getAllAssessment() {
        try {
            const option = { include: assessmentModel }

            const clother = (await assessmentModel.findAll( option )).dataValues,
                assessment = clother.assessment

            return assessment
        } catch (err) {
            throw err
        }
    }

    static async getUser( assessmentId ) {
        this.#checkParam( assessmentId, 'number', 'getUser' )

        try {
            const optionAssessment = { where: { id: assessmentId }, raw: true, nest: true }

            const userId = (await assessmentModel.findOne( optionAssessment )).userId,
                optionUser= { where: { id: userId } },
                user = ( await userModel.findOne( optionUser ) ).dataValues

            return user
        } catch (err) {
            throw err
        }
    }

    static #checkParam( param, type, message ) {
        if( typeof param === type ) return true

        throw new Error(`Param is inválid!. the error occurred at: ${ message }`)
    }
}