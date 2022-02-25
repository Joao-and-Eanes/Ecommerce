const fs = require('fs')
const { join } = require('path')

module.exports = class FsController {
    static getNameRoutes( version ) {
        const path = join( __dirname, '../', 'routes', `v${version}`),
            nameFolders = fs.readdirSync( path )
        
        return nameFolders
    }
}