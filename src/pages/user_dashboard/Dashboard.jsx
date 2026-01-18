import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import Usermenu from '../../components/Layout/Usermenu';

const Dashboard = () => {

  const [auth] = useAuth();

  return (
    <Layout title={'Ecommerce User Dashboard'}>
        <div className='flex p-6 '>
          <div className='w-[30%]'>
            <Usermenu />
          </div>
          <div className='ml-2 p-4 font-bold text-2xl border-2 border-black rounded w-[70%]'>
            <h1 className='p-2'>User Name: {auth?.user?.name}</h1>
            <h1 className='p-2'>User Email: {auth?.user?.email}</h1>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard