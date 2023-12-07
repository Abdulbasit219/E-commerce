import React from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Eyebutton = ({showEye, eyeToggle}) => {
    return (
        <>
            <button className='absolute right-2 top-1/2 hover:opacity-50' onClick={eyeToggle}>
                {showEye ? <FaEyeSlash /> : <FaEye />}
            </button>
        </>
    )
}

export default Eyebutton