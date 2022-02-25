const { join } = require('path')
const { readFileSync } = require('fs')

module.exports = class ImageController {

    static convertImagesToArray( images ) {
        const getFilename = ({ filename }) => filename

        const nameImages = images.map( getFilename )

        return nameImages
    }

    static getImagesByArray( keyImages ) {
        if( !this.#isJson( keyImages ) ) {
            return false
        }else keyImages = JSON.parse( keyImages )
        
        const pathDefault = join( __dirname, '..', 'uploads', 'images')

        const convertKeyToBuffer = key => {
            const path = join( pathDefault, key )

            const buffer = readFileSync( path )

            return buffer
        }

        const images = keyImages.map( convertKeyToBuffer );

        return images
    }

    static #isJson( json ) {
        try {
            JSON.parse( json )
            return true
        } catch (err) {
            return false
        }
    }
}