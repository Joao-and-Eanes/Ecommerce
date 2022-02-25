import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8081'
})

export const checkAuth = async login => {
    const response = (await api.post( '/auth/token', login )).data,
    serverOk = response.success,
    token = response.token
    
    if( serverOk ) {
        if( token ) return { server: true, token }
        
        return { server: true, token: false }
    }
    
    return { server: false, token: false }
}

export const getUser = async token => {
    const config = {
        headers: {
            Authorization: token
        }
    } 
    
    const response = (await api.get( '/auth/user', config )).data,
    serverOk = response.server,
    user = response.user
    
    if( serverOk ) {
        if( user ) return { server: true, user }

        return { server: true, user: false }
    }

    return { server: false, user: false }
}

export default api