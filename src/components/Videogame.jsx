import React, { useContext, useEffect, useState } from 'react'
import { Store } from './StoreProvider'
import { FaTimes } from 'react-icons/fa'


const Videogame = () => {

  const { state, dispatch } = useContext(Store)

  //get games
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

  //delete games
  const onDelete = async (game) => {

    let response = await fetch(`http://localhost:8081/api/delete/game/${game.id}`,
      {
        method: 'DELETE'
      })

    if (response.status === 200) {
      dispatch({
        type: 'remove-game',
        payload: game
      })
    }
  }

  //update games
  
  const onCheckBoxLanguaje = async (event, game) => {
    const checked = event.currentTarget.checked;

    let gameWithCheckboxInformation = {...game,subSpanish: checked} 

    let gameUpdatedPromise = await fetch(`http://localhost:8081/api/update/game`,
    {method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(gameWithCheckboxInformation) //send the body the game with the info check
        })

        let gameUpdated = await gameUpdatedPromise.json()//making the game into a json structure

    dispatch({
        type: 'update-game',
        payload: gameUpdated  
    })
  }

  const onCheckBox = async (event, game) => {
    const checked = event.currentTarget.checked;

    let gameWithCheckboxInformation = {...game,finished: checked} 

    let gameUpdatedPromise = await fetch(`http://localhost:8081/api/update/game`,
    {method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(gameWithCheckboxInformation) //send the body the game with the info check
        })

        let gameUpdated = await gameUpdatedPromise.json()//making the game into a json structure

    dispatch({
        type: 'update-game',
        payload: gameUpdated  
    })
}



  //filter gamesconst [search,setSearch] = useState('') 
  const [searchTerm, setSearch] = useState('')

  const onSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <input className='filtergames' type='text' placeholder='Filter video games' value={searchTerm} onChange={onSearch} />
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
          state.listOfGames.filter((gameSearched) => {
            if (searchTerm == "") {
              return gameSearched
            } else if (gameSearched.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return gameSearched
            }
          }).map(game => {
            return <tbody className="justBody" >
              <tr>
                <td>{game.name}</td>
                <td>{game.mainLanguaje}</td>
                <td> {game.webToDownload}</td>
                <td className="inputStyler"><input type="checkbox" onChange={(event)=> onCheckBoxLanguaje(event,game)} checked={game.subSpanish}/></td>
                <td className="inputStyler"><input type="checkbox" onChange={(event)=> onCheckBox(event,game)} checked={game.finished}/></td>
                <td className="inputStyler"> <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(game)} /></td>
              </tr>
            </tbody>
          })
        }
      </table>
    </div>
  )
}

export default Videogame
