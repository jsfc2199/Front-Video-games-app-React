import React, {useContext, useRef} from 'react'
import {Store} from './StoreProvider'

const AddGame = () => {
    return (
        <form className='add-form'>
            <div className='form-control'>
                <label>Videogame's Name</label>
                <input type='text' placeholder='Name' />
            </div>

            <div className='form-control'>
                <label>Principal languaje</label>
                <input type='text' placeholder='Languaje' />
            </div>

            <div className='form-control'>
                <label>Url to download</label>
                <input type='text' placeholder='URL' />
            </div>

            <input type='submit' value='Save game' className='btn-save'/>
        </form>
    )
}

export default AddGame
