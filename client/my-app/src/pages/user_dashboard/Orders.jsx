import React from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'


const Orders = () => {
    return (
        <Layout title={'Ecommerce User-Orders'}>
            <div className='flex p-6 flex-col md:flex-row'>
                <div className='md:w-[30%]'>
                    <Usermenu />
                </div>
                <div className='ml-2 p-4 font-bold text-2xl border-2 border-black rounded sm:w-[70%] md:w-[100%] mt-4'>
                    <h1 className='p-2'>All Orders</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Orders