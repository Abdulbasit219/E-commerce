import React from 'react'
import Layout from '../../components/Layout/Layout'
import './Contactus.css'

const Contactus = () => {
  return (
    <Layout title={"Contact-us"}>
      <div className='flex flex-col items-center h-[90vh]'>
        <div className='my-12'>
          <p className='font-bold text-4xl'>Contact Us</p>
        </div>
        <div>
          <div className='flex mobile-screen w-full'>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Name:</label>
                <input type="text" placeholder='Enter text here' className='border-2 border-black rounded-lg p-4 outline-none '/>
              </div>
              <div className='flex flex-col ml-4'>
              <label htmlFor="" className='font-bold'>Email:</label>
                <input type="text" placeholder='Enter text here' className='border-2 border-black rounded-lg p-4 outline-none '/>
              </div>
              <div className='flex flex-col ml-4'>
              <label htmlFor="" className='font-bold'>Phone:</label>
                <input type="text" placeholder='Enter text here' className='border-2 border-black rounded-lg p-4 outline-none '/>
              </div>
          </div>

          <div className='flex flex-col mt-4'>
            <label htmlFor="" className='font-bold'>Message:</label>
            <input type="text" className='border-2 border-black rounded-lg p-4 outline-none' placeholder='Enter text here'/>
          </div>
          
          <div className='text-center mt-6'>
            <button className='bg-green-500 text-white font-bold p-2 rounded-lg hover:opacity-50'>Submit Form</button>
          </div>
        
        </div>
      </div>
    </Layout>
  )
}

export default Contactus