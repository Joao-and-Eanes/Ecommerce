const INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT'

export const addCart = cart => {
    return {
        type: INCREMENT,
        payload: cart
    }
}

export const removeCartById = id => {
    return {
        type: DECREMENT,
        payload: id
    }
}