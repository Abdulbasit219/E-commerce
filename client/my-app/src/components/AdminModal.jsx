import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const AdminModal = ({ closeModal, orderId }) => {

    //state
    const [products, setProducts] = useState([]);

    const authData = localStorage.getItem('authData');
    const parseData = JSON.parse(authData);


    const getProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/orders/${orderId}`, {
                headers: {
                    Authorization: parseData?.token
                }
            })
            if (data) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // product delete 
    const productDelete = async (orderId, productId) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/product/orders/${orderId}/products/${productId}`, {
                headers: {
                    Authorization: `${parseData.token}` //Pass the token through headers
                }
            });

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div>

            {/* Main modal */}
            <div
                id="crud-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative p-4 w-full max-w-lg">

                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-x-auto">

                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                View Products
                            </h3>

                            {/* close modal  */}
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>

                        </div>


                        {/* Modal body */}
                        <div className="grid gap-4 mb-4 grid-cols-2 m-4">

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Product Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products && products.map(product => (
                                        <tr
                                            key={product._id}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={`http://localhost:8080/api/v1/product/get-productphoto/${product._id}`} alt="User profile" />
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.name.substring(0, 20)}...
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.quantity}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    className='text-blue-500 hover:opacity-50'
                                                    onClick={() => productDelete(orderId, product._id)}> Delete Products
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminModal
