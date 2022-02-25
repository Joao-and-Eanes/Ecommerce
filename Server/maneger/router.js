const FsController = require('../utils/fs')

module.exports = class RouterManeger {
    
    static initialize( app ) {
        this.#checkParam( app, 'function', 'createRoutes' )

        const version = 1

        this.#createRoutes( app, version )
    }

    static #createRoutes( app, version ) {
        this.#checkParam( app, 'function', 'createRoutes' )
        this.#checkParam( version, 'number', 'createRoutes' )

        const nameRoutes = FsController.getNameRoutes( version )

        const handleRoutes = name => {
            const treatName = name.replace( /.js/, '' )
            
            const router = require(`../routes/v${ version }/${ treatName }`).router()

            app.use( `/${ treatName }`, router )
        }

        nameRoutes.forEach( handleRoutes )
    }

    static #checkParam( param, type, message ) {
        if( typeof param === type ) return true

        throw new Error(`Param inválid!. the error occurred at: ${ message }`)
    }
}