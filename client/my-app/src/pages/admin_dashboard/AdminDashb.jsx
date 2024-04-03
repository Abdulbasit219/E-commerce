import React from 'react'
import Layout  from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import { useAuth } from '../../context/auth'

const AdminDashb = () => {
  const [auth] = useAuth();

  return (
    <Layout title={'Ecommerce Admin-Dashboard'}>
        <div className='flex p-6 '>
          <div className='w-[30%]'>
            <Adminmenu />
          </div>
          <div className='ml-2 p-4 font-bold text-2xl border-2 border-black rounded w-[70%]'>
            <h1 className='p-2'>Admin Name: {auth?.user?.name}</h1>
            <h1 className='p-2'>Admin Email: {auth?.user?.email}</h1>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashb