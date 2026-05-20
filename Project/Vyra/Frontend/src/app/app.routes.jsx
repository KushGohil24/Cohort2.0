import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../features/home/pages/Home'
import Collection from '../features/products/pages/Collection'
import About from '../features/home/pages/About'
import Contact from '../features/home/pages/Contact'
import Login from '../features/auth/pages/Login'
import Cart from '../features/cart/pages/Cart'
import Product from '../features/products/pages/Product'
import PlaceOrder from '../features/cart/pages/PlaceOrder'
import Orders from '../features/orders/pages/Orders'
import Profile from '../features/auth/pages/Profile'
import CreateProduct from '../features/products/pages/CreateProduct'
import SellerProducts from '../features/products/pages/SellerProducts'
import Dashboard from '../features/products/pages/Dashboard'
import Protected from '../features/auth/components/Protected'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/product/:productId' element={<Product />} />
      <Route path='/place-order' element={<PlaceOrder />} />
      <Route path='/orders' element={<Orders />} />
      
      {/* Protected Seller Routes */}
      <Route path='/create-product' element={
        <Protected allowedRoles={['seller']}>
          <CreateProduct />
        </Protected>
      } />
      <Route path='/seller-products' element={
        <Protected allowedRoles={['seller']}>
          <SellerProducts />
        </Protected>
      } />
      <Route path='/dashboard' element={
        <Protected allowedRoles={['seller']}>
          <Dashboard />
        </Protected>
      } />
    </Routes>
  )
}
