const initialState = [
   
]

const Cart = ( state = initialState, action ) => {
    switch( action.type ) {
        case "INCREMENT":
            return [ action.payload, ...state ]
        case "DECREMENT":
            const filterCart = ({ id }) => id !== action.payload

            return state.filter( filterCart )
        default:
            return state
    }
}

export default Cart