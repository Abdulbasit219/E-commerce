import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom'

const { Option } = Select // for drop down menu

const Product = () => {

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');

  const authData = localStorage.getItem('authData'); //Get the data from localStorage
  const parseData = JSON.parse(authData); //convert Object into Array
  
  const navigate = useNavigate();

  //get All Categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/categories');
      if (data.success) {
        setCategories(data.category)
      }
    } catch (e) {
      console.log(e);
      toast.error(data.message);
    }
  }

  // create a new product
  const createProduct = async (e) => {
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append('category', category);
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantity', quantity);
      productData.append('photo', photo);

      const {data} = await axios.post('http://localhost:8080/api/v1/product/create-product', productData,  {
      headers: {
        Authorization: `${parseData.token}` //Pass the token through headers
      }});
      
      if(data?.success){
        toast.success(data?.message);
        navigate('/dashboard/admin/products');
      }else{
        toast.error(data?.message);
      }

    }catch (e) {
      console.log(e)
      toast.error('something went wrong');
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  useEffect(() => {
    console.log(photo)
  },[photo])

  return (
    <Layout title={'Ecommerce Admin-Panel'}>
      <div className='flex p-6 flex-col md:flex-row'>
        <div className='md:w-[30%]'>
          <Adminmenu />
        </div>

        <div className='ml-2 p-4 font-bold text-2xl border-2 border-black rounded sm:w-[70%] md:w-[100%] mt-4'>

          <h1 className='p-2'>Manage Product</h1>
          <div>

            {/* category */}
            <Select
              placeholder={'Select Category'}
              size='large'
              showSearch
              className='w-72 outline-none'
              onChange={(value) => { setCategory(value) }}
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>{category.name}</Option>
              ))}
            </Select>

            {/* image upload */}
            <div className="col-span-full mt-3">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Upload photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-2">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>{photo ? photo.name : 'upload photo'}</span>
                      <input id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setPhoto(e.target.files[0])} />
                    </label>
                    <p className="pl-1">{photo ? '' : 'or drag and drop'}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">{photo ? '' : 'PNG, JPG, GIF up to 10MB'}</p>
                </div>
              </div>
            </div>

            {/* image preview */}
            <div className='m-5 flex justify-center'>
              {photo && (
                <div className='text-center'>
                  <img src={URL.createObjectURL(photo)} alt="Product-photo" width={'200px'} />
                </div>
              )}
            </div>

            {/* name input */}
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Product name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={name}
                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none"
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* description */}
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    value={description}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none px-1"
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* price */}
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={price}
                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none"
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* quantity */}
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Quantity
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={quantity}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none"
                    onChange={e => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* shipping */}
            <Select
              placeholder={'Select shipping'}
              size='large'
              showSearch
              className='w-72 outline-none mt-5'
              onChange={(value) => { setShipping(value) }}
            >
              <Option value='0'>Yes</Option>
              <Option value='1'>No</Option>
            </Select>

            {/* cancel and create product btn */}
            <div className="mt-6 flex items-center justify-center gap-x-6">
              
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:opacity-50" onClick={() => navigate('/dashboard/admin')}>
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={createProduct}
              >
                Create Product
              </button>

            </div>
            
               
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Product