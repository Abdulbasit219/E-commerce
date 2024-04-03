import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'
import { useAuth } from '../../context/auth'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import Eyebutton from '../../components/Eye/Eyebutton';

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();

    //state
    const [showEye, setshoweye] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    const authData = localStorage.getItem('authData'); //Get the data from localStorage
    const parseData = JSON.parse(authData); //convert Object into Array

    const onchange = (e) => {
        const { name, value } = e.target;
        setData((prevdata) => ({
            ...prevdata,
            [name]: value
        }))
    }

    const eyeToggle = (e) => {
        e.preventDefault();
        setshoweye(!showEye);
    }

    const handleSubmit = async (e) => {
        const { name, email, password } = data;
        e.preventDefault();
        try {
            const { data } = await axios.put(`https://api-to2k.onrender.com/api/v1/auth/Profile`,
                {
                    name,
                    email,
                    password
                },
                {
                    headers: {
                        Authorization: parseData?.token
                    }
                },
            );
            if (data.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let lS = localStorage.getItem('authData');
                lS = JSON.parse(lS);
                lS.user = data.updatedUser;
                localStorage.setItem('authData', JSON.stringify(lS));
                toast.success('Profile updated successfully');
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const { email, name, password } = auth?.user;
        setData({ name, email, password });
    }, [auth?.user])

    return (
        <Layout title={'Ecommerce User-Dashboard'}>
            <div className='flex p-6 flex-col md:flex-row'>
                <div className='md:w-[30%]'>
                    <Usermenu />
                </div>
                <div className='ml-2 p-4 text-2xl border-2 border-black rounded sm:w-[70%] md:w-[100%] mt-4'>
                    <h1 className='p-2 text-center text-3xl'>User Profile</h1>
                    <div className='flex flex-col justify-center items-center'>

                        <input
                            type="text"
                            name="name"
                            onChange={onchange}
                            placeholder='Enter Name here'
                            className='border-b-2 border-black py-2 outline-none text-xl mt-2 sm:w-[90%] md:w-[50%]'
                            value={data?.name} />

                        <input
                            type="text"
                            name="email"
                            onChange={onchange}
                            placeholder='Enter Email here'
                            className='border-b-2 border-black py-2 outline-none text-2xl mt-8 sm:w-[90%] md:w-[50%]'
                            value={data?.email}
                            disabled />

                        <div className='sm:w-[90%] md:w-[50%] flex relative'>

                            <input
                                type={showEye ? 'text' : 'password'}
                                name="password"
                                placeholder='Enter Password here'
                                onChange={onchange}
                                className='border-b-2 border-black py-2 outline-none text-2xl mt-8 mb-2 w-full' />

                            <Eyebutton showEye={showEye} eyeToggle={eyeToggle} />
                        </div>

                        <div className='text-center mt-6'>
                            <button className='bg-black text-white py-2 px-10 text-2xl rounded-lg hover:opacity-50 hover:scale-105 transition-transform duration-500' onClick={handleSubmit}>Update Profile</button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile