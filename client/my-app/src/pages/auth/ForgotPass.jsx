import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import Eyebutton from '../../components/Eye/Eyebutton'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const ForgotPass = () => {
    const [showEye, setshoweye] = useState(false);
    const [resetData, setResetdata] = useState({
        email: '',
        question: '',
        newPassword: ''
    })

    const navigate = useNavigate();

    const onchange = (e) => {
        const { name, value } = e.target;
        setResetdata((prevdata) => ({
            ...prevdata,
            [name]: value
        }))
    }

    const eyeToggle = (e) => {
        e.preventDefault();
        setshoweye(!showEye);
    }

    const handleSubmit = async (e) => {
        const { email, question, newPassword } = resetData;
        e.preventDefault();
        try {
            const res = await axios.post('https://api-to2k.onrender.com/api/v1/auth/forgotpassword',
                {
                    email,
                    question,
                    newPassword
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
        <Layout title={'Ecommerce Reset Password'}>
            <div className='my-20'>
                <form action="">
                    <div>
                        <p className='font-bold text-4xl p-2 text-center font-serif'>Reset Password</p>
                    </div>

                    <div className='flex flex-col justify-center items-center'>

                        <input type="text" name="email" placeholder='Enter Email' className='border-b-2 border-black py-2 outline-none text-2xl mt-6 sm:w-[90%] md:w-[50%]' onChange={onchange} />

                        <input type="text" name="question" placeholder='Enter Security Question' className='border-b-2 border-black py-2 outline-none text-2xl mt-6 sm:w-[90%] md:w-[50%]' onChange={onchange} />

                        <div className='sm:w-[90%] md:w-[50%] flex relative mt-4'>

                            <input type={showEye ? 'text' : 'password'} name="newPassword" placeholder='Enter New Password' className='border-b-2 border-black py-2 outline-none text-2xl mt-4 mb-2 w-full' onChange={onchange} autoComplete='off' />

                            <Eyebutton showEye={showEye} eyeToggle={eyeToggle} />

                        </div>

                    </div>

                    <div className='text-center mt-4'>
                        <button className='bg-black text-white py-2 px-10 text-2xl rounded-lg hover:opacity-50 hover:scale-105 transition-transform duration-500' onClick={handleSubmit}>Reset Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPass