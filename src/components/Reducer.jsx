function reducer(state, action) {
    switch (action.type) {
        case 'get-games':
            const stateWithAllGames={
                ...state,
                listOfGames: action.payload
            }
            return stateWithAllGames
            
        case 'add-game':
            const newGame = action.payload
            const listStateWithNewGame=[...state.listOfGames, newGame]
            const stateWithNewGameAdded={
                ...state, listOfGames: listStateWithNewGame
            }
            return stateWithNewGameAdded

        case 'remove-game':
            const newlistOfNotesWithOutPayloadGame =
                state.listOfGames.filter(game => game.id !== action.payload.id)
            const newStateWithoutNoteDeleted = { ...state, listOfGames: newlistOfNotesWithOutPayloadGame }
            return newStateWithoutNoteDeleted

        case 'update-game':
            return state
    }
}

export default reducer;