import React from 'react'

const categoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className='mt-2'>
            <input type="text" className='border-2 p-1 rounded' placeholder='Enter New Category' 
            value={value}
            onChange={ (e) => setValue(e.target.value) }
            />
        </div>

        <button className='bg-blue-500 rounded text-white p-2 font-bold hover:opacity-50 my-2' type='Submit'>Submit</button>
        </form>
    </>
  )
}

export default categoryForm