const sizeModel = require('../models/size')

module.exports = class SizeController {
    static create( size, clotherId ) {
        this.#checkParam( size, 'object', 'create' )
        this.#checkParam( clotherId, 'number', 'create' )

        try {
            sizeModel.create( { clotherId, ...size } )
        } catch (err) {
            throw err
        }
    }

    static delete( sizeId ) {
        this.#checkParam( sizeId, 'number', 'delete' )

        try {
            const option = { where: { id: sizeId } }

            sizeModel.destroy( option )
        } catch (err) {
            throw err
        }
    }

    static update( newData, sizeId ) {
        this.#checkParam( newData, 'object', 'create' )
        this.#checkParam( sizeId, 'number', 'create' )

        try {
            const option = { where: { id: sizeId }}
            sizeModel.update( newData, option )
        } catch (err) {
            throw err
        }
    }

    static async getSizeById( sizeId ) {
        this.#checkParam( sizeId, 'number', 'getSizeById' )

        try {
            const option = { where: { id: sizeId }, raw: true, nest: true }

            const size = await sizeModel.findOne( option )

            return size
        } catch (err) {
            throw err
        }
    }

    static async getAllSizesByClotherId( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getAllSizesByClotherId' )

        try {
            const option = { where: { clotherId }, raw: true, nest: true }

            const size = await sizeModel.findAll( option )

            return size
        } catch (err) {
            throw err
        }
    }

    static async getSizeLower( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getSizeLower' )

        const sizes = await this.getAllSizesByClotherId( clotherId )

        const sizeLower = sizes.filter( ({ size }) => size === 'l' )[0]

        return sizeLower
    }

    static async getSizeMedium( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getSizeMedium' )
        
        const sizes = await this.getAllSizesByClotherId( clotherId )

        const sizeMedium = sizes.filter( ({ size }) => size === 'm' )[0]

        return sizeMedium
    }

    static async getSizeBig( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getSizeBig' )
        
        const sizes = await this.getAllSizesByClotherId( clotherId )

        const sizeBig = sizes.filter( ({ size }) => size === 'b' )[0]

        return sizeBig
    }

    static #checkParam( param, type, message ) {
        if( typeof param === type ) return true

        throw new Error(`Param is inválid!. the error occurred at: ${ message }`)
    }
}