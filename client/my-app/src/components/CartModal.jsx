import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import SuccessModal from './SuccessModal';


const CartModal = ({ closeModal, totalPrice, totalItem }) => {

    //context
    const [auth] = useAuth();
    const [cart, setCart] = useCart();

    // state 
    const [shoppingCart, setShoppingCart] = useState({
        name: '',
        email: '',
        address: '',
        number: '',
        cart: [],
    });
    const [successModal, setSuccessModal] = useState(false);

    const authData = localStorage.getItem('authData'); //Get the data from localStorage
    const parseData = JSON.parse(authData); //convert Object into Array

    const handleSubmit = async () => {
        if (!shoppingCart.name || !shoppingCart.email || !shoppingCart.address || !shoppingCart.cart) {
            if (!shoppingCart.name) {
                return toast.error('Name is required');
            } else if (!shoppingCart.email) {
                return toast.error('Email is required');
            } else if (!shoppingCart.address) {
                return toast.error('Address is required');
            }
        }
        try {
            const response = await axios.post('http://localhost:8080/api/v1/product/sent-order',
                {
                    name: shoppingCart.name,
                    email: shoppingCart.email,
                    address: shoppingCart.address,
                    shoppingCart: shoppingCart.cart,
                    number: shoppingCart.number
                },
                {
                    headers: {
                        Authorization: parseData?.token
                    }
                })
            if (response.status === 200 && response.data.ok) {
                setSuccessModal(true);
                setCart([]);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const onchange = (e) => {
        const { name, value } = e.target;
        setShoppingCart((prevStat) => ({
            ...prevStat,
            [name]: value
        }))
    }

    useEffect(() => {
        setShoppingCart(prevState => ({
            ...prevState,
            name: auth?.user?.name || '',
            cart: cart
        }));
    }, [auth?.user, cart])


    return (
        <>
            <div>

                {/* Main modal */}
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="relative p-4 w-full max-w-md">

                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Product
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

                                {/* name */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={shoppingCart.name}
                                        onChange={onchange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        disabled
                                    />
                                </div>

                                {/* email */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                        onChange={onchange}
                                        placeholder='Enter a Valid Email Address'
                                    />
                                </div>

                                {/* Number */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="number"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Whatsapp Number
                                    </label>
                                    <input
                                        type="text"
                                        name="number"
                                        id="number"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                        onChange={onchange}
                                        placeholder='Enter Your WhatsApp Number'
                                    />
                                </div>

                                {/* Address */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Address
                                    </label>
                                    <textarea
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type Complete Valid Address"
                                        required
                                        onChange={onchange}
                                    />
                                </div>

                                {/* price */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        disabled
                                        value={totalPrice}
                                    />

                                </div>

                                {/* Item Quantity Total Item  */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="Total Item Quantity"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Total Items
                                    </label>
                                    <input
                                        type="number"
                                        name="totalItem"
                                        id="totalItem"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        disabled
                                        value={totalItem}
                                    />

                                </div>

                            </div>


                            {/* buying product */}
                            <button
                                className="m-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={handleSubmit}
                            >
                                <svg
                                    className="-ms-1 me-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                Add new product
                            </button>

                            {/* success Modal open */}
                            {
                                successModal && (
                                    <SuccessModal closeModall={closeModal} />
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CartModal