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
import Profile from './pages/user_dashboard/Profile'
import Orders from './pages/user_dashboard/Orders'
import AllProduct from './pages/admin_dashboard/AllProduct'
import UpdatedProduct from './pages/admin_dashboard/UpdatedProduct'
import Search from './pages/search/Search'
import MoreDetail from './pages/productDetail/MoreDetail'
import Catwisepro from './pages/category_wise_product/Catwisepro'
import Cartproduct from './pages/cart/Cartproduct'
import ShopNow from './pages/shopnow/ShopNow'
import AllOrders from './pages/admin_dashboard/AllOrders'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allproduct' element={<ShopNow />} />
        <Route path='about' element={<About />} />
        <Route path='contactus' element={<Contactus />} />
        <Route path='privacypolicy' element={<Policy />} />
        <Route path='search' element={<Search />} />
        <Route path='cart' element={<Cartproduct />} />
        <Route path='product/:slug' element={<MoreDetail />} />
        <Route path='category-product/:slug' element={<Catwisepro />} />

        {/* Nested Routes */}
        <Route path='dashboard' element={<Privateroutes />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>

        {/* /dashboard/admin/orders */}
        <Route path='dashboard' element={<AdminRoutes />}>
          <Route path='admin' element={<AdminDashb />} />
          <Route path='admin/category' element={<Category />} />
          <Route path='admin/product' element={<Product />} />
          <Route path='admin/product/:slug' element={< UpdatedProduct />} />
          <Route path='admin/products' element={<AllProduct />} />
          <Route path='admin/orders' element={<AllOrders />} />
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