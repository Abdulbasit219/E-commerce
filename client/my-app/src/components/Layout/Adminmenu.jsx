import React from 'react'
import { Link } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <>
      <p className='text-center font-bold p-4 text-xl'>Admin Panel</p>
      <div className='flex flex-col'>
        <Link to='/dashboard/admin/category' className='border-2 border-black-500 p-2 rounded opacity-70'>Create Category</Link>
        <Link to='/dashboard/admin/product' className='border-2 border-black-500 p-2 rounded opacity-70'>Create Product</Link>
        <Link to='/dashboard/admin/products' className='border-2 border-black-500 p-2 rounded opacity-70'>Products</Link>
        <Link to='/dashboard/admin/users' className='border-2 border-black-500 p-2 rounded opacity-70'>Users</Link>
      </div>
    </>
  )
}

export default Adminmenu