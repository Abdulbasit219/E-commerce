import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const editModal = ({ closeModal, product, order, refresh }) => {

    const authData = localStorage.getItem('authData'); 
    const parseData = JSON.parse(authData);   

    //delete product
    const productDelete = async (order, product) => {
        try {
            const orderId = order._id;
            const productId = product._id;

            const { data } = await axios.delete(`https://api-to2k.onrender.com/api/v1/product/orders/${orderId}/products/${productId}`, {
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

    return (
        <div id="login-popup" tabIndex="-1" className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">

                    {/* close popup */}
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
                        onClick={closeModal}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>

                    <div className="p-5">
                        <h3 className="text-2xl mb-0.5 font-medium"></h3>
                        <p className="mb-4 text-sm font-normal text-gray-800"></p>

                        <div className="text-center">
                            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                                {product.name}
                            </p>
                        </div>

                        <form className="w-full">

                            <div className='flex justify-center'>
                                <img
                                    className="w-24 h-24 rounded-full"
                                    src={`https://api-to2k.onrender.com/api/v1/product/get-productphoto/${product._id}`} alt="Product Image" />
                            </div>

                            <div className='flex'>
                                <input
                                    name="Price"
                                    type="text"
                                    disabled
                                    value={product.price}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                    placeholder="Password"
                                />

                                <input
                                    name="Qty"
                                    type='text'
                                    disabled
                                    value={product.quantity}
                                    className="mt-2 ml-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                    placeholder="Password"
                                />
                            </div>

                            <div className='flex m-2'>
                                <button
                                    className="my-2 inline-flex w-full items-center justify-center rounded-lg bg-gray-500 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1">
                                    Cancel
                                </button>
                                <button
                                    className="my-2 ml-2 inline-flex w-full items-center justify-center rounded-lg bg-red-500 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                                    onClick={() => {
                                        productDelete(order, product)
                                        closeModal();
                                        refresh();
                                    }
                                    }
                                >
                                    Delete
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default editModal