import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Contactus from './pages/contact/Contactus'
import Policy from './pages/privacypolicy/Policy'
import Pagenotfound from './pages/pageNotfound/Pagenotfound'
import SignUp from './pages/auth/signUp'
import SignIn from './pages/auth/signIn'
import Dashboard from './pages/user_dashboard/Dashboard'
import Privateroutes from './components/Routes/Privateroutes'
import ForgotPass from './pages/auth/ForgotPass'
import AdminRoutes from './components/Routes/AdminRoutes'
import AdminDashb from './pages/admin_dashboard/AdminDashb'
import Category from './pages/admin_dashboard/Category'
import Product from './pages/admin_dashboard/Product'
import Adminuser from './pages/admin_dashboard/Adminuser'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contactus' element={<Contactus />} />
        <Route path='privacypolicy' element={<Policy />} />

        {/* Nested Routes */}
        <Route path='dashboard' element={<Privateroutes />}>
          <Route path='user' element={<Dashboard />} />
        </Route>

        <Route path='dashboard' element={<AdminRoutes />}>
          <Route path='admin' element={<AdminDashb />} />
          <Route path='admin/category' element={<Category />} />
          <Route path='admin/product' element={<Product />} />
          <Route path='admin/users' element={<Adminuser />} />
        </Route>

        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='forgotPass' element={<ForgotPass />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App