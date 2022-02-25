const clotherModel = require('../models/clother')
const sizeModel = require('../models/size')
const assessmentModel = require('../models/assessment')

const imageController = require('../utils/image')

const { unlinkSync } = require('fs')
const { join } = require('path')

module.exports = class ClotherController {
    static create( clother ) {
        this.#checkParam( clother, 'object', 'create' )

        try {
            clotherModel.create( { ...clother} )
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

    static async update( newData, clotherId ) {
        this.#checkParam( newData, 'object', 'update' )
        this.#checkParam( clotherId, 'number', 'update' )

        const checkUpdateImage = async keyImages => {
            const changeImages = ( key, index ) => {
                if( keyImages[ index ] ) {
                    const path = join( __dirname, '..', 'uploads', 'images', key )

                    unlinkSync( path )

                    return keyImages[ index ]
                }

                return key
            }

            const oldImages = await this.#getArrayImagesByClotherId( clotherId ),
                newImages = oldImages.map( changeImages )

            return newImages
        }

        try {
            const option = { where: { id: clotherId }},
                { images } = newData

            const newClother = { ...newData }

            if( newClother.images ) {
                const newImages = await checkUpdateImage( images )

                newClother.images = newImages
            }
            
            clotherModel.update( newClother, option )
        } catch (err) {
            throw err
        }
    }

    static async getClotherById( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getClotherById' )

        try {
            const option = { where: { id: clotherId },  include: { all: true } }

            const clotherRaw = (await clotherModel.findOne( option )),
                clother = this.#treatClother( clotherRaw )

            return clother
        } catch (err) {
            throw err
        }
    }

    static async getClotherByWhere( where ) {
        this.#checkParam( where, 'object', 'getClotherByWhere' )

        try {
            const option = { where, include: { all: true } }

            const clotherRaw = await clotherModel.findOne( option ),
                clother = this.#treatClother( clotherRaw )

            return clother
        } catch (err) {
            throw err
        }
    }

    static async getAllClother() {
        try {
            const option = { subQuery: false, include: { all: true } }

            const clotherRaw = await clotherModel.findAll( option ),
                clother = this.#treatClother( clotherRaw )

            return clother
        } catch (err) {
            throw err
        }
    }

    static async getAllClotherByWhere( where ) {
        try {
            const option = { subQuery: false, include: { all: true }, where }

            const clotherRaw = await clotherModel.findAll( option ),
                clother = this.#treatClother( clotherRaw )

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

    static async getAllAssessments( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getAllSizes' )

        const assessmets = (await this.getClotherById( clotherId )).assessments

        return assessmets
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

    static async #getArrayImagesByClotherId( clotherId ) {
        this.#checkParam( clotherId, 'number', 'getAllimagesByClotherId')

        try {
            const option = { where: { id: clotherId },  include: { all: true } }

            const clotherRaw = (await clotherModel.findOne( option ))

            const images = JSON.parse( clotherRaw.images )

            return images 

        } catch (err) {
            throw err
        }
    }

    static #treatClother( clother ) {
        const clotherIsArray = Array.isArray( clother )
        
        const getValue = elem => elem.dataValues,
            treatArrayClothers = elem => {
                const sizes = elem.sizes.map( getValue ),
                    assessments = elem.assessments.map( getValue ),
                    hasImages = elem.images && elem.images.length

                if( hasImages ) {
                    const images = imageController.getImagesByArray( elem.images )

                    elem.images = images
                }

                elem.sizes = sizes
                elem.assessments = assessments
            }

        if( clotherIsArray ) {
            const newCLother = clother.map( getValue )

            newCLother.forEach( treatArrayClothers )

            return newCLother
        }else{
            const newClother = clother.dataValues
            const sizes = newClother.sizes.map( getValue ),
                images = imageController.getImagesByArray( newClother.images ),
                assessments = newClother.assessments.map( getValue )
            
            newClother.sizes = sizes
            newClother.images = images
            newClother.assessments = assessments

            return newClother
        }
    }

    static #checkParam( param, type, message ) {
        if( typeof param === type ) return true

        throw new Error(`Param is inválid!. the error occurred at: ${ message }`)
    }
}