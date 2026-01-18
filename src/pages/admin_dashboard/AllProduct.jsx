import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import Adminmenu from '../../components/Layout/Adminmenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProduct = () => {

    const [Products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try{
            const {data} = await axios.get(`https://api-to2k.onrender.com/api/v1/product/products`);
            if(data.success){
                setProducts(data.product);
            }
        }catch(e){
            console.log(e)
            toast.error('something went wrong in getAllProducts')
        } 
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout title={'Ecommerce Admin-Panel'}>
            <div className='flex p-6 flex-col md:flex-row'>
                <div className='md:w-[30%]'>
                    <Adminmenu />
                </div>
                <div className='ml-2 p-4 text-xl border-2 border-black rounded sm:w-[70%] md:w-[100%] mt-4'>
                    <h1 className='text-center font-bold'>ALL Products</h1>
                    
                    <div className='flex flex-wrap'>
                        
                        {Products?.map(product =>(       
                        <div key={product._id} className='w-[90%] lg:w-[30%] border-2 m-2 p-2 shadow-lg '>
                        <Link to={`/dashboard/admin/product/${product.slug}`} >
                            <div className='flex justify-center'>                
                            <img src={`https://api-to2k.onrender.com/api/v1/product/get-productphoto/${product._id}`} alt={product.name}  />
                            </div>
                           <div className='p-2'>
                            <p className='mt-2 font-bold'>Name: {product.name}</p>
                            <p className='mt-2'>Description: {product.description.substring(0,30)}...</p>
                            <p className='mt-2'>Price: {product.price}&#36;</p>
                            </div>
                        </Link>
                        </div>
                        ))}

                    </div>
                            
                </div>
            </div>
        </Layout>
    )
}

export default AllProduct