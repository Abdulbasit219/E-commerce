import React from 'react'
import { Link } from 'react-router-dom'

const Usermenu = () => {
  return (
    <>
    <p className='text-center font-bold p-4 text-xl'>Dashboard</p>
    <div className='flex flex-col'>
      <Link to='/dashboard/user/profile' className='border-2 border-black-500 p-2 rounded opacity-70'>Profile</Link>
      <Link to='/dashboard/user/orders' className='border-2 border-black-500 p-2 rounded opacity-70'>Orders</Link>
    </div>
  </>
    )
}

export default Usermenu