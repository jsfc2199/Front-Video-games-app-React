import React, { useContext, useEffect } from 'react'
import { FaTimes} from 'react-icons/fa'
import { Store } from './StoreProvider'

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
    console.log(data)
    return data
  }

  return (
    <div>
      <table className="justTable">
        <thead>
          <tr className="justTableHead">
            <th>Id</th>
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
                <td>{game.id}</td>
                <td>{game.name}</td>
                <td>{game.mainLanguaje}</td>
                <td> {game.webToDownload}</td>
                <td className="inputStyler"><input type="checkbox" /></td>
                <td className="inputStyler"><input type="checkbox" /></td>
                <td className="inputStyler"> <FaTimes style={{color: 'red' , cursor: 'pointer'}} /></td>
              </tr>
            </tbody>
          })
        }
      </table>
    </div>
  )
}

export default Videogame
