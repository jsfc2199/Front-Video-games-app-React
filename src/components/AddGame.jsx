import React, { useContext, useState } from 'react'
import { Store } from './StoreProvider'

const AddGame = () => {

    const [name, setName] = useState('')
    const [mainLanguaje, setLanguaje] = useState('')
    const [webToDownload, setWebsite] = useState('')

    const addGame = (e) => {
        setName(e.target.value)
    }

    const addLanguaje = (e) => {
        setLanguaje(e.target.value)
    }

    const addWebsite = (e) => {
        setWebsite(e.target.value)
    }

    //add button functionality to save video game
    const onAdd = async (event) => {
        event.preventDefault();
        if (name && mainLanguaje && webToDownload) {
            const gameForm = {
                name,
                mainLanguaje,
                webToDownload,
                subSpanish: false,
                isFinished: false,
            }

            let gameInPromise = await fetch(`http://localhost:8081/api/save/game`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(gameForm)

                })

            let gameToSave = await gameInPromise.json()

            dispatch({
                type: 'add-game',
                payload: gameToSave
            })
            form.reset()
        }
        
    }


    const { state, dispatch } = useContext(Store)

    return (
        <form className='add-form' onSubmit={onAdd} id="form">
            <div className='form-control'>
                <label>Videogame's Name</label>
                <input onChange={addGame} type='text' placeholder='Name' />
            </div>

            <div className='form-control'>
                <label>Principal languaje</label>
                <input onChange={addLanguaje} type='text' placeholder='Languaje' />
            </div>

            <div className='form-control'>
                <label>Url to download</label>
                <input onChange={addWebsite} type='text' placeholder='URL' />
            </div>

            <input type='submit' value='Save video game' className='btn-save'/>
        </form>
    )
}

export default AddGame
