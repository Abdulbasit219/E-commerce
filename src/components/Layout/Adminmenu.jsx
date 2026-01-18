import React from 'react'
import { Link } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <>
      <p className='text-center font-bold p-4 text-xl'>Admin Panel</p>
      <div className='flex flex-col'>
        <Link to='/dashboard/admin/category' className='border-2 border-black-500 p-2 rounded opacity-70'>Manage Category</Link>
        <Link to='/dashboard/admin/product' className='border-2 border-black-500 p-2 rounded opacity-70'>Manage Product</Link>
        <Link to='/dashboard/admin/products' className='border-2 border-black-500 p-2 rounded opacity-70'>Manage Products</Link>
        <Link to='/dashboard/admin/orders' className='border-2 border-black-500 p-2 rounded opacity-70'>Manage Orders</Link>
      </div>
    </>
  )
}

export default Adminmenu