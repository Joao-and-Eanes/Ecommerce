const bcrypt = require('bcrypt')

const createHash = password => {
    const salts = bcrypt.genSaltSync( 10 ),
        hash = bcrypt.hashSync( password, salts )

    return hash
}

const comparePassword = ( password, hash ) => {
    const passwordCorrect = bcrypt.compareSync( password, hash )

    return passwordCorrect
}

module.exports = {
    createHash,
    comparePassword
}