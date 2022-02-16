const clotherModel = require('../models/clother')
const sizeModel = require('../models/size')

module.exports = class ClotherController {
    static create( clother ) {
        this.#checkParam( clother, 'object', 'create' )

        try {
            clotherModel.create( clother )
        } catch (err) {
            throw err
        }
    }

    static delete( clotherId ) {
        this.#checkParam( clotherId, 'number', 'delete' )

        try {
            const option = { where: { id: clotherId } }

            clotherModel.destroy( option )
        } catch (err) {
            throw err
        }
    }

    static update( newData, clotherId ) {
        this.#checkParam( newData, 'object', 'update' )
        this.#checkParam( clotherId, 'number', 'update' )

        try {
            const option = { where: { id: clotherId }}
            clotherModel.update( newData, option )
        } catch (err) {
            throw err
        }
    }

    static async getClotherById( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getClotherById' )

        try {
            const option = { where: { id: clotherId },  include: sizeModel }

            const clother = (await clotherModel.findOne( option )).dataValues

            this.#treatClother( clother )

            return clother
        } catch (err) {
            throw err
        }
    }

    static async getClotherByWhere( where ) {
        this.#checkParam( where, 'object', 'getClotherByWhere' )

        try {
            const option = { where, include: sizeModel }

            const clother = (await clotherModel.findOne( option )).dataValues

            this.#treatClother( clother )

            return clother
        } catch (err) {
            throw err
        }
    }

    static async getAllClother() {
        try {
            const option = { raw: true, nest: true }

            const clother = await clotherModel.findAll( option )

            return clother
        } catch (err) {
            throw err
        }
    }

    static async getAllSizes( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getAllSizes' )

        const sizes = (await this.getClotherById( clotherId )).sizes

        return sizes
    }

    static async getSizeLower( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getSizeLower' )

        const sizes = (await this.getClotherById( clotherId )).sizes,
            sizeLower = sizes.filter( ({ size }) => size === 'l')

        return sizeLower
    }

    static async getSizeMedium( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getSizeMedium' )

        const sizes = (await this.getClotherById( clotherId )).sizes,
            sizeMedium = sizes.filter( ({ size }) => size === 'm')

        return sizeMedium
    }

    static async getSizeBig( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getSizeBig' )

        const sizes = (await this.getClotherById( clotherId )).sizes,
            sizeBig = sizes.filter( ({ size }) => size === 'b')

        return sizeBig
    }

    static #treatClother( clother ) {
        clother.sizes = clother.sizes.map( elem => elem.dataValues )
    }

    static #checkParam( param, type, message ) {
        if( typeof param === type ) return true

        throw new Error(`Param is inválid!. the error occurred at: ${ message }`)
    }
}