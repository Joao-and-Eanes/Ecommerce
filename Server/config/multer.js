const { join } = require('path')
const { randomBytes } = require('crypto')

const { diskStorage } = require('multer')

const pathDefault = join( __dirname, '..', 'uploads', 'images' )

module.exports = {
    dest: pathDefault,
    storage: diskStorage({
        destination: ( req, file, cb ) => cb( null, pathDefault ),
        filename: ( req, file, cb ) => {
            randomBytes( 16, ( err, hash ) => {
                if( err ) cb( err )

                const filename = `${ hash.toString('hex') }-${ file.originalname }`
                
                cb( null, filename )
            })
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: ( req, file, cb ) => {
        const allowedMines = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ]

        const allowedFile = allowedMines.includes( file.mimetype )

        allowedFile ? cb( null, file ) : cb( new Error('file type not allowed!'))
    }
}