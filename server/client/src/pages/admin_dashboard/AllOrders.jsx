import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AdminModal from '../../components/AdminModal'
import { Select } from 'antd'
import { FaFilter } from "react-icons/fa";
import toast from 'react-hot-toast'
const { Option } = Select;


const AllOrders = () => {

    //state
    const [orders, setOrders] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [orderId, setOrderId] = useState();
    const [status, setStatus] = useState([
        'Pending',
        'Delivered'
    ]);
    const [allowEdit, setAllowEdit] = useState([
        "yes",
        "No"
    ])
    const [filterOrders, setFilterOrders] = useState([]);

    const authData = localStorage.getItem('authData');
    const parseData = JSON.parse(authData);

    //get orders and products
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/orders', {
                headers: {
                    Authorization: parseData?.token
                }
            });
            if (data) {
                setOrders(data.order);
                setFilterOrders(data.order);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // change status
    const handleStatusChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/product/order-status/${orderId}`, { status: value }, {
                headers: {
                    Authorization: parseData?.token
                }
            });
            getAllOrders()
        } catch (error) {
            console.log(error);
        }
    }

    //allowEdit
    const allowForEdit = async (orderId, value) => {
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/product/allow-edit/${orderId}`, { allowedStatus: value }, {
                headers: {
                    Authorization: parseData?.token
                }
            })
            getAllOrders();
        } catch (error) {
            console.log(error);
        }
    }

    //handle filter order
    const handleFilter = (value) => {
        if (value === 'Pending') {
            setFilterOrders(orders.filter(order => order.status === 'Pending'));
        } else if (value === 'Delivered') {
            setFilterOrders(orders.filter(order => order.status === 'Delivered'));
        } else {
            setFilterOrders(orders);
        }
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/product/order/${orderId}`, {
                headers: {
                    Authorization: parseData?.token
                }
            });
            if (data.success) {
                toast.success('Order has been Deleted successfully');
                getAllOrders();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllOrders();
    }, [])

    return (
        <Layout title={'Ecommerce Admin Panel'}>
            <div className='flex p-6 flex-col md:flex-row'>
                <div className='md:w-[30%]'>
                    <Adminmenu />
                </div>
                <div className='ml-2 p-4 font-bold text-2xl border-2 border-black rounded sm:w-[70%] md:w-[100%] mt-4'>
                    <div className='flex border'>
                        <h1 className='p-2'>Manage Orders</h1>

                        <div className='w-[80%] flex items-center justify-end'>
                            <label htmlFor=""><FaFilter /></label>
                            <Select
                                defaultValue={'Filter Order'}
                                className='font-bold'
                                onChange={(value) => { handleFilter(value) }}>
                                <Option value={'Pending'}>
                                    Show Pending Order
                                </Option>
                                <Option value={'Delivered'}>
                                    Show Delivered Order
                                </Option>
                                <Option value={''}>
                                    Show Both Order
                                </Option>
                            </Select>
                        </div>

                    </div>

                    <div>

                        {/* main item name */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            BUYER NAME
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            CONTACT NO
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            EMAIL
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ADDRESS
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            STATUS
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            LOCK ORDER
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            VIEW PRODUCTS
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            DELETE ORDER
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filterOrders.length <= 0 ?
                                        <tr>
                                            <td>
                                                <p>Orders Not Found</p>
                                            </td>
                                        </tr>
                                        :
                                        filterOrders.map(order => (
                                            <tr
                                                key={order._id}
                                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {order.name}
                                                </th>

                                                <td className="px-6 py-4">
                                                    {order.contactNumber}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {order.email}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {order.address}
                                                </td>

                                                <td className="py-4 flex items-center">
                                                    <div className={`h-2.5 w-2.5 rounded-full ${order.status === "Pending" ? 'bg-red-500' : "bg-green-500"} me-2`}></div>

                                                    <Select
                                                        variant={false}
                                                        onChange={(value) => { handleStatusChange(order._id, value) }}
                                                        defaultValue={order.status}>
                                                        {status.map((s, i) => (
                                                            <Option
                                                                key={i}
                                                                value={s}>{s}</Option>
                                                        ))}
                                                    </Select>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Select
                                                        variant={false}
                                                        onChange={(value) => { allowForEdit(order._id, value) }}
                                                        defaultValue={order.allowEdit}>
                                                        {allowEdit.map((s, i) => (
                                                            <Option
                                                                key={i}
                                                                value={s}>{s}</Option>
                                                        ))}
                                                    </Select>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Link
                                                        onClick={() => {
                                                            setOpenModal(true);
                                                            setOrderId(order._id);
                                                        }}
                                                        className='text-blue-500'>Products
                                                    </Link>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Link
                                                        onClick={() => {
                                                            handleDeleteOrder(order._id);
                                                        }}
                                                        className='text-blue-500'>Delete
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

            {openModal &&
                <AdminModal
                    closeModal={() => setOpenModal(false)}
                    orderId={orderId}
                />
            }

        </Layout>
    )
}

export default AllOrders