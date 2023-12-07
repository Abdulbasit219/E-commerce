import React from 'react'
import Layout from '../../components/Layout/Layout'
import './Home.css'
import {useAuth} from '../../context/auth' 

const Home = () => {
    const [auth, setAuth] = useAuth();

  return (
        <Layout title={"Home"}>
          <p>Home</p>
          <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    )
}

export default Home