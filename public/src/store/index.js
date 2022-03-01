import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import reducers from './reducers'

const reducer = combineReducers( reducers )

const store = createStore( reducer )

const ProviderTag = ({ children }) => {
    return (
        <Provider store={ store }>
            { children }
        </Provider>
    )
}

export default ProviderTag