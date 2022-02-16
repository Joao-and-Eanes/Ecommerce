const addressModel = require('../models/address')
const userModel = require('../models/user')

module.exports = class AddressController {
    static create( address, userId ) {
        this.#checkParam( address, 'object', 'create' )
        this.#checkParam( userId, 'number', 'create' )

        address.userId = userId

        try {
            addressModel.create( address )
        } catch (err) {
            throw err
        }
    }

    static delete( addressId ) {
        this.#checkParam( addressId, 'number', 'delete' )

        try {
            const option = { where: { id: addressId } }

            addressModel.destroy( option )
        } catch (err) {
            throw err
        }
    }

    static update( newData, addressId ) {
        this.#checkParam( newData, 'object', 'update' )
        this.#checkParam( addressId, 'number', 'update' )

        try {
            const option = { where: { id: addressId }}
            addressModel.update( newData, option )
        } catch (err) {
            throw err
        }
    }

    static async getAddressById( addressId ) {
        this.#checkParam( addressId, 'number', 'getAddressById' )

        try {
            const option = { where: { id: addressId }, raw: true, nest: true }

            const address = await addressModel.findOne( option )

            return address
        } catch (err) {
            throw err
        }
    }

    static async getAllAddressByUserId( userId ) {
        this.#checkParam( userId, 'number', 'getAllAddressByUserId' )

        try {
            const option = { where: { userId }, raw: true, nest: true }

            const address = await addressModel.findAll( option )

            return address
        } catch (err) {
            throw err
        }
    }

    static async getAllAddress() {
        try {
            const option = { raw: true, nest: true }

            const address = await addressModel.findAll( option )

            return address
        } catch (err) {
            throw err
        }
    }

    static async getUser( addressId ) {
        this.#checkParam( addressId, 'number', 'getUser' )

        try {
            const optionAddress = { where: { id: addressId }, raw: true, nest: true }

            const userId = (await addressModel.findOne( optionAddress )).userId,
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