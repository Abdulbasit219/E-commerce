import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Contactus from './pages/contact/Contactus'
import Policy from './pages/privacypolicy/Policy'
import Pagenotfound from './pages/pageNotfound/Pagenotfound'
import SignUp from './pages/auth/signUp'
import SignIn from './pages/auth/signIn'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contactus' element={<Contactus />} />
        <Route path='/privacypolicy' element={<Policy />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App