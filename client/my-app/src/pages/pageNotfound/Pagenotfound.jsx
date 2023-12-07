import React from 'react'
import Layout from '../../components/Layout/Layout'
import './pagenotfound.css'
import { useNavigate } from 'react-router-dom'

const Pagenotfound = () => {

  const navigate = useNavigate();

  return (
    <Layout title={"Error-PageNotFound"}>
      <div className='flex flex-col h-[80vh] justify-center items-center'>
        <p className='font-bold text-6xl'>OOPS !</p>
        <p className='font-bold text-2xl'>Error 404 : Page Not Found</p>
        <button className='bg-green-400 p-2 mt-4 rounded-lg hover:opacity-50 font-bold' onClick={()=>{navigate('/')}}>Go Back</button>
      </div>
    </Layout>
    )
}

export default Pagenotfound