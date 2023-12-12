import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Eyebutton from '../../components/Eye/Eyebutton'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/auth'

const signIn = () => {

    const [showEye, setshoweye] = useState(false);
    const [signInData, setSignData] = useState({
        email: '',
        password: ''
    })
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const onchange = (e) => {
        const { name, value } = e.target;
        setSignData((prevdata) => ({
            ...prevdata,
            [name]: value
        }))
    }

    const eyeToggle = (e) => {
        e.preventDefault();
        setshoweye(!showEye);
    }

    const handleSubmit = async (e) => {
        const { email, password } = signInData;
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/login`,
                { email, password }
            );
            if (res.data.success) {
                toast.success(res.data.message, { duration: 10000 });
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('authData', JSON.stringify(res.data))
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Layout title={'Ecommerce Sign In'}>
            <div className='my-20'>
                <form action="">
                    <div>
                        <p className='font-bold text-4xl p-2 text-center font-serif'>Sign In</p>
                        <p className='text-center'>Create An Account <span className='font-bold cursor-pointer hover:text-blue-500 transition-colors duration-300'><Link to={'/signup'}>Sign Up</Link></span></p>
                    </div>

                    <div className='flex flex-col justify-center items-center'>

                        <input type="text" name="email" placeholder='Enter Email' className='border-b-2 border-black py-2 outline-none text-2xl mt-6 sm:w-[90%] md:w-[50%]' onChange={onchange} autoComplete='email' />

                        <div className='sm:w-[90%] md:w-[50%] flex relative mt-4'>
                            <input type={showEye ? 'text' : 'password'} name="password" placeholder='Enter Password' className='border-b-2 border-black py-2 outline-none text-2xl mt-4 mb-2 w-full' onChange={onchange} autoComplete='off' />

                            <Eyebutton showEye={showEye} eyeToggle={eyeToggle} />

                        </div>

                        <p className='hover:opacity-50'>
                            <Link to={"/forgotPass"}>Forgot Password?</Link>
                        </p>
                    </div>

                    <div className='text-center mt-4'>
                        <button className='bg-black text-white py-2 px-10 text-2xl rounded-lg hover:opacity-50 hover:scale-105 transition-transform duration-500' onClick={handleSubmit}>Log In</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default signIn 