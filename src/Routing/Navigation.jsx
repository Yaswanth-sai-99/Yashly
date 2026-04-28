import React from 'react'
import {Routes, Route, useNavigate, Navigate} from "react-router-dom"
import Home from '../pages/Home'
import Beauty from '../pages/Beauty'
import Groceries from '../pages/Groceries'
import Furniture from '../pages/Furniture'
import Fragrances from '../pages/fragrances'
import Cart from '../pages/Cart'
import { Signup } from '../pages/signUP'
import Form from '../pages/Form'

function ProtectedRoute({ children }){
  const user = JSON.parse(localStorage.getItem('userCredentials'));
  return user?.IsLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function Navigation({products, setIsLoggedIn}) {
  return (
   
        <Routes>
            <Route path='/' element={<Form/>}/>
            <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/login' element={<Form setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/home' element={<ProtectedRoute> <Home products={products}/> </ProtectedRoute> }/>
            <Route path='/Beauty' element={<Beauty products={products}/>}/>
            <Route path='/Fragrances' element={<Fragrances products={products}/>}/>
            <Route path='/Groceries' element={<Groceries products={products}/>}/>
            <Route path='/Furniture' element={<Furniture products={products}/>}/>
            <Route path='/cart' element={<Cart/>}/>
        </Routes>
  )
}
