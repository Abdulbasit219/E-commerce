import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import Eyebutton from '../../components/Eye/Eyebutton';

const signUp = () => {

    const [showEye, setshoweye] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        question: ''
    })

    const navigate = useNavigate();

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
        const { name, email, password, question } = data;
        e.preventDefault();
        try {
            const res = await axios.post(`https://api-to2k.onrender.com/api/v1/auth/register`,
                {
                    name,
                    email,
                    password,
                    question
                }
            );
            if (res.data.success) {
                toast.success(res.data.message, { duration: 10000 });
                navigate('/signin');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout title={'Ecommerce Sign up'}>
            <div className='my-10'>
                <form>
                    <div className='font-bold text-4xl p-2 text-center font-serif my-4'>
                        <p>Sign Up</p>
                    </div>

                    <div className='flex flex-col justify-center items-center'>

                        <input type="text" name="name" onChange={onchange} placeholder='Enter Name here' className='border-b-2 border-black py-2 outline-none text-2xl mt-2 sm:w-[90%] md:w-[50%]' />

                        <input type="text" name="email" onChange={onchange} placeholder='Enter Email here' className='border-b-2 border-black py-2 outline-none text-2xl mt-8 sm:w-[90%] md:w-[50%]' />

                        <input type="text" name="question" onChange={onchange} placeholder='Enter Your Elementary School name' className='border-b-2 border-black py-2 outline-none text-2xl mt-8 sm:w-[90%] md:w-[50%]' />

                        <div className='sm:w-[90%] md:w-[50%] flex relative'>

                            <input type={showEye ? 'text' : 'password'} name="password" placeholder='Enter Password here' onChange={onchange} className='border-b-2 border-black py-2 outline-none text-2xl mt-8 mb-2 w-full' />

                            <Eyebutton showEye={showEye} eyeToggle={eyeToggle} />
                        </div>

                        <p>Already a member? <span className='font-bold cursor-pointer hover:text-blue-500 transition-colors duration-300'><Link to={'/signin'}>Log In</Link></span></p>

                    </div>

                    <div className='text-center mt-6'>
                        <button className='bg-black text-white py-2 px-10 text-2xl rounded-lg hover:opacity-50 hover:scale-105 transition-transform duration-500' onClick={handleSubmit}>Sign Up</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default signUp