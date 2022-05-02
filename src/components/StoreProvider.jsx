import React, { createContext, useReducer } from 'react'
import reducer from './Reducer'

const initialState = {
    game: {
        id: '',
        name: '',
        mainLanguaje: '',
        webToDownload: '',
        subSpanish: false,
        isFinished: false
    },
    listOfGames: [
    ]
}

const Store = createContext(initialState)
const StoreProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer,initialState)

    return(
    <Store.Provider value = {{state,dispatch}}>
        {children}
    </Store.Provider>
    )
}

export default StoreProvider
export {Store,initialState}