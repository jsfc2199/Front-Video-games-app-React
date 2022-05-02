function reducer(state, action) {
    switch (action.type) {
        case 'get-games':
            const stateWithAllGames={
                ...state,
                listOfGames: action.payload
            }
            return stateWithAllGames
        case 'add-note':
            return state
        case 'remove-note':
            return state
        case 'update-note':
            return state
    }
}

export default reducer;