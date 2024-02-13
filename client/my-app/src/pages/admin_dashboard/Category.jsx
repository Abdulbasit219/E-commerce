import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import { toast } from 'react-hot-toast'
import CategoryForm from '../../components/Forms/categoryForm'
import axios from 'axios'
import { Button, Modal } from 'antd';

const Category = () => {

  const [categories, setCategories] = useState([]); //for category
  const [name, setName] = useState(''); //for create category
  const [isModalOpen, setIsModalOpen] = useState(false); //For Edit category
  const [selectedCategory, setSelectedCategory] = useState(null); //For edit category
  const [updatedName, setUpdatedName] = useState(null); //For update the category name

  const authData = localStorage.getItem('authData'); //Get the data from localStorage
  const parseData = JSON.parse(authData); //convert Object into Array

  //Get All Categories
  const getCategories = async () => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/category/categories');
      if (data?.success) {
        setCategories(data.category)
      }
    } catch (e) {
      console.log(e);
      toast.error('Error while processing category');
    }
  }

  //submit btn for new category (Create new category)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`http://localhost:8080/api/v1/category/create-category`, { name }, {
        headers: {
          Authorization: `${parseData.token}` //Pass the token through headers
        },
      });

      if (data.success) {
        toast.success(`${data.message}`);
        getCategories();
        setName('');
      }

    } catch (e) {
      console.log(e);
      toast.error(`${data.message}`);
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  //Update the categories
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selectedCategory._id}`, { name: updatedName }, {
        headers: {
          Authorization: `${parseData.token}` //Pass the token through headers
        }
      });
      if (data.success) {
        toast.success(`${data.message}`);
        getCategories();
        setIsModalOpen(false);
      }

    } catch (e) {
      console.log(e)
      toast.error(`${data.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${id}`);
      if (res.status === 200) {
        toast.success('Category deleted successfully');
        getCategories();
      }
    } catch (e) {
      console.log(e)
      toast.error('Something went wrong in handleDelete');
    }
  }

  return (
    <Layout title={'Ecommerce Admin-Category'}>
      <div className='flex p-6 flex-col md:flex-row'>
        <div className='md:w-[30%]'>
          <Adminmenu />
        </div>
        <div className='ml-2 p-4 text-2xl border border-black rounded sm:w-[70%] md:w-[100%] mt-4'>
          <h1 className='p-2 font-bold'>Manage Category</h1>
          <div>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <div>
            <table className="table-auto border">
              <thead className='font-bold'>
                <tr>
                  <th className='border py-2'>Name</th>
                  <th className='border py-2' colSpan={2}>Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map(category => (
                  <tr key={category._id} className='border-2 text-center'>

                    <td className='border-2 lg:px-60'>{category.name}</td>

                    <td className='border-2 p-2'>
                      <button className='bg-blue-500 p-2 text-white font-bold rounded hover:opacity-50' onClick={() => {
                        setIsModalOpen(true);
                        setUpdatedName(category.name);
                        setSelectedCategory(category)
                      }}>Edit</button>
                    </td>

                    <td className='border-2 p-2'>
                      <button className='bg-red-500 p-2 text-white font-bold rounded hover:opacity-50' onClick={() => { handleDelete(category._id) }}>Delete</button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <Modal title="Edit Category"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null} >
            <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
          </Modal>

        </div>
      </div>
    </Layout>
  )
}

export default Category