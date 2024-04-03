import React from 'react'
import { useState, useEffect } from "react"
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner/Spin';
import axios from 'axios'

const AdminRoutes = () => {

    const [okres, setOkres] = useState();
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("https://api-to2k.onrender.com/api/v1/auth/admin",
                {
                    headers: {
                        'Authorization': auth?.token
                    }
                }
            )
            { res.data.ok ? setOkres(true) : setOkres(false) }
        }
        if(auth?.token) authCheck()
    }, [auth?.token])

    return  okres ? <Outlet/> : <Spinner path='/' />;

}

export default AdminRoutes