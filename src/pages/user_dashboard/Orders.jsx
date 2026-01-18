import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import EditModal from '../../components/editModal';
import formatDistance from 'date-fns/formatDistance'

const Orders = () => {

    //context
    const [auth] = useAuth();

    //states
    const [orders, setOrders] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState([]);
    const [order, setOrder] = useState([]);

    const authData = localStorage.getItem('authData');
    const parseData = JSON.parse(authData);

    //get the order
    const getOrders = async () => {
        try {
            const { data } = await axios.get('https://api-to2k.onrender.com/api/v1/auth/order', {
                headers: {
                    Authorization: parseData?.token
                }
            });
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    //calculate the total bills of products
    const calTotalBill = () => {
        let total = 0;
        orders?.map(order => {
            order.products.map(product => {
                total += product.price * product.quantity; // Multiply price by quantity
            })
        });
        setTotalBill(total);
    }

    //time set when user place order
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const str = formatDistance(
            dateObj,
            new Date()
        );
        return str;
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])

    useEffect(() => {
        calTotalBill();
    }, [orders])

    return (
        <Layout title={'Ecommerce User-Dashboard'}>
            <div className='flex p-6 flex-col md:flex-row'>
                <div className='md:w-[30%]'>
                    <Usermenu />
                </div>

                <div className='ml-2 p-4 font-bold text-2xl border-2 border-black rounded sm:w-[70%] md:w-[100%] mt-4'>
                    <h1 className='p-2'>All Orders</h1>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                                {/* main item name */}
                                <tr>
                                    <th scope="col" className="p-4">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>

                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    order.products.map(product => (

                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={product._id}>


                                            <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                                                {/* product image */}
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={`https://api-to2k.onrender.com/api/v1/product/get-productphoto/${product._id}`} alt="User profile" />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{product.name.substring(0, 20)}...</div>
                                                </div>

                                            </td>


                                            <td className="px-6 py-4">
                                                {product.quantity}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className={`h-2.5 w-2.5 rounded-full ${order.status === "Pending" ? 'bg-red-500' : "bg-green-500"} me-2`}></div> {order.status}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div>{product.price}</div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{formatDate(order.createdAt)}</p>
                                            </td>

                                            <td className="px-6 py-4">
                                                {order.status === 'Pending' &&
                                                    order.allowEdit === 'no' ?
                                                    <a
                                                        href="#"
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        onClick={
                                                            () => {
                                                                setOpenModal(true)
                                                                setEditData(product)
                                                                setOrder(order)
                                                            }
                                                        }
                                                    >
                                                        Edit Product
                                                    </a>
                                                    :
                                                    <p>Not Access</p>
                                                }
                                            </td>

                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='m-4'>
                        <p>Total Bill: <span className='font-normal'> &#36;{totalBill} </span></p>
                    </div>
                </div>
            </div>
            {openModal &&
                <EditModal
                    closeModal={() => setOpenModal(false)}
                    product={editData}
                    order={order}
                    refresh={getOrders()}
                />
            }
        </Layout>
    )
}

export default Orders