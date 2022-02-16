const preferredModel = require('../models/preferred'),
    userModel = require('../models/user')

const clotherController = require('../controllers/clother')

module.exports = class PreferredController {
    static async create( clotherId, userId ) {
        this.#checkParam( clotherId, 'number', 'create' )
        this.#checkParam( userId, 'number', 'create' )

        const { name, price } = await clotherController.getClotherById( clotherId ),
            preferred = {
                userId,
                name,
                price,
                imageKey: '2'
            }

        try {
            preferredModel.create( preferred )
        } catch (err) {
            throw err
        }
    }

    static delete( preferredId ) {
        this.#checkParam( preferredId, 'number', 'delete' )

        try {
            const option = { where: { id: preferredId } }

            preferredModel.destroy( option )
        } catch (err) {
            throw err
        }
    }

    static update( newData, preferredId ) {
        this.#checkParam( newData, 'object', 'update' )
        this.#checkParam( preferredId, 'number', 'update' )

        try {
            const option = { where: { id: preferredId }}
            preferredModel.update( newData, option )
        } catch (err) {
            throw err
        }
    }

    static async getPreferredById( preferredId ) {
        this.#checkParam( preferredId, 'number', 'getPreferredById' )

        try {
            const option = { where: { id: preferredId }, raw: true, nest: true }

            const preferred = await preferredModel.findOne( option )

            return preferred
        } catch (err) {
            throw err
        }
    }

    static async getAllPreferredByUserId( userId ) {
        this.#checkParam( userId, 'number', 'getAllAddressByUserId' )

        try {
            const option = { where: { userId }, raw: true, nest: true }

            const preferred = await preferredModel.findAll( option )

            return preferred
        } catch (err) {
            throw err
        }
    }

    static async getAllPreferred() {
        try {
            const option = { raw: true, nest: true }

            const preferred = await preferredModel.findAll( option )

            return preferred
        } catch (err) {
            throw err
        }
    }

    static async getUser( preferredId ) {
        this.#checkParam( preferredId, 'number', 'getUser' )

        try {
            const optionPreferred = { where: { id: preferredId }, raw: true, nest: true }

            const userId = (await preferredModel.findOne( optionPreferred )).userId,
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