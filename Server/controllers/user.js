const userModel = require('../models/user')
const addressModel = require('../models/address')
const preferredModel = require('../models/preferred')
const assessmentModel = require('../models/assessment')

module.exports = class UserController {
    static create( user ) {
        this.#checkParam( user, 'object', 'create' )

        try {
            userModel.create( user )
        } catch (err) {
            throw err
        }
    }

    static delete( userId ) {
        this.#checkParam( userId, 'number', 'delete' )

        try {
            userModel.destroy({ where: { id: userId } })
        } catch (err) {
            throw err
        }
    }

    static update( newData, userId ) {
        this.#checkParam( newData, 'object', 'update' )
        this.#checkParam( userId, 'number', 'update' )

        try {
            const option = { where: { id: userId } }

            userModel.update( newData, option )
        } catch (err) {
            
        }
    }

    static async getUserById( userId ) {
        this.#checkParam( userId, 'number', 'getUserById' )

        try {
            const option = { where: { id: userId }, include: { all: true } }

            const user = (await userModel.findOne( option )).dataValues

            this.#convertUser( user )

            return user
        } catch (err) {
            throw err
        }
    }

    static async getUserByWhere( where ) {
        this.#checkParam( where, 'object', 'getUserByWhere' )

        try {
            const option = { where, include: { all: true } }

            const user = (await userModel.findOne( option )).dataValues

            this.#convertUser( user )

            return user
        } catch (err) {
            throw err
        }
    }

    static async getAllUser() {
        const treatUser = elem => {
            const newUser = elem.dataValues

            this.#convertUser( newUser )

            return newUser
        }

        try {
            const option = { include: { all: true } }

            const userRaw = await userModel.findAll( option ),
                user = userRaw.map( treatUser )

            return user
        } catch (err) {
            throw err
        }
    }

    static async getAddress( userId ) {
        this.#checkParam( userId, 'number', 'getAddress')

        try {
            const option = { where: { userId } }

            const address = (await addressModel.findAll( option )).map( elem => elem.dataValues )

            return address
        } catch (err) {
            throw err
        }
    }

    static async getPreferred( userId ) {
        this.#checkParam( userId, 'number', 'getAddress')

        try {
            const option = { where: { userId } }

            const preferred = (await preferredModel.findAll( option )).map( elem => elem.dataValues )

            return preferred
        } catch (err) {
            throw err
        }
    }

    static async getAssessment( userId ) {
        this.#checkParam( userId, 'number', 'getAssessment')

        try {
            const option = { where: { userId } }

            const assessment = (await assessmentModel.findAll( option )).map( elem => elem.dataValues )

            return assessment
        } catch (err) {
            throw err
        }
    }

    static #checkParam( param, type, message ) {
        if( typeof param === type ) return true

        throw new Error(`Param inválids!. The error occurred in: ${ message }`)
    }

    static #convertUser( user ) {
        const cleanElem = elem => elem.dataValues

        user.addresses = user.addresses.map( cleanElem )

        user.preferreds = user.preferreds.map( cleanElem )

        user.assessments = user.assessments.map( cleanElem )
    }
}