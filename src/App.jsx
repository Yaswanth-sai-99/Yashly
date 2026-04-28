import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, Zoom} from 'react-toastify';
import axios from 'axios';
import './App.css';

import Header from './components/Header';
import Navigation from './Routing/Navigation';

export default function App() {
  const location = useLocation();
  const authRoutes = ['/','/login', '/signup'];
  const isAuthPage = authRoutes.includes(location.pathname);



  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProduct] = useState([]);


  useEffect(() => {
    const User = localStorage.getItem('userCredentials');
    if (User) {
      try{
        const U = JSON.parse(User);
        setIsLoggedIn(U.IsLoggedIn == true);
      } catch(e){
        console.error("Parsing Error", e)
      }
    }
  }, []);

  useEffect(() => {
    axios('https://dummyjson.com/products')
      .then(res => setProduct(res.data.products))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="app-main">
      <ToastContainer
            position="top-center"
            autoClose={2000}
            transition={Zoom}  // This gives the "blast/pop" effect
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            theme="dark" // Matches your Yashly dark theme better
          />
      {isLoggedIn && !isAuthPage && <Header setIsLoggedIn={setIsLoggedIn} />}
          
          <main className={isLoggedIn && !isAuthPage ? "auth-wrapper" : "content-wrapper"}>
            <Navigation products={products} setIsLoggedIn={setIsLoggedIn} />
          </main>
    </div>
  );
}