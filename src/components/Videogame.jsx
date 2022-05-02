import React, { useContext, useEffect } from 'react'
import { Store } from './StoreProvider'
import { FaTimes} from 'react-icons/fa'

const Videogame = () => {

  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    let listOfGames = fetchAllGames().then(
      (games) => {

        let action = {
          type: 'get-games',
          payload: games
        }
        dispatch(action)
      }
    )
  }, [])

  const fetchAllGames = async () => {
    let response = await fetch(`http://localhost:8081/api/get/games`)
    let data = await response.json()
    return data
  }


  const onDelete = async (game) => {

    let response = await fetch(`http://localhost:8081/api/delete/game/${game.id}`, //we have the id from the note
      {
        method: 'DELETE'//we don't send info because we are deleting
      })

    //if the status is ok we send the action to delete
    //we do this because we don't want to affect the global state        
    if (response.status === 200) {
      dispatch({
        type: 'remove-game',
        payload: game
      })
    }
  }



  return (
    <div>
      <table className="justTable">
        <thead>
          <tr className="justTableHead">
            
            <th>Videogame's Name</th>
            <th>Principal Languaje</th>
            <th>Web to download</th>
            <th>Sub spanish</th>
            <th>Is game ended?</th>
            <th>Delete</th>
          </tr>
        </thead>

        {
          state.listOfGames.map(game => {
            return <tbody className="justBody" >
              <tr>
                
                <td>{game.name}</td>
                <td>{game.mainLanguaje}</td>
                <td> {game.webToDownload}</td>
                <td className="inputStyler"><input type="checkbox" /></td>
                <td className="inputStyler"><input type="checkbox" /></td>
                <td className="inputStyler"> <FaTimes style={{color: 'red' , cursor: 'pointer'}} onClick={()=>onDelete(game)}/></td>
              </tr>
            </tbody>
          })
        }
      </table>
    </div>
  )
}

export default Videogame
