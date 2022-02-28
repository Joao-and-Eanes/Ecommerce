const jwt = require('jsonwebtoken')

const createToken = payload => {
    const option = {
        expiresIn: '1d'
    }

    const token = jwt.sign( payload, process.env.PASSPORT_KEY, option )

    return token
}

const verifyToken = token => {
    const tokenIsValid = jwt.verify( token, process.env.PASSPORT_KEY )

    return tokenIsValid
}

const decodeToken = token => {
    const payload = jwt.decode( token )

    return payload
}

module.exports = {
    createToken,
    verifyToken,
    decodeToken
}