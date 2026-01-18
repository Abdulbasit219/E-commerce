import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const spinner = ({ path = 'signin' }) => {
    //create for spinner calculation
    const [count, setCount] = useState(3);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((val) => --val);
        }, 1000);

        count === 0 && navigate(`${path}`, {
            state: location.pathname,
        })

        const cleanInterval = () => {
            clearInterval(interval)
        }

        return cleanInterval;

    }, [count, navigate, location, path]);


    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <span className="relative flex h-10 w-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-10 w-10 bg-gray-300"></span>
                </span>
            </div>
        </>
    )
}

export default spinner