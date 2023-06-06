import React from 'react'
import './Loader.css'
import { ClimbingBoxLoader } from 'react-spinners'

function Loader() {
    return (
        <div className='loader'>
            <ClimbingBoxLoader
                color="#05ff00"
                size={30}
            />
        </div>
    )
}

export default Loader