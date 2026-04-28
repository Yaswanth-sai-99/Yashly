import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { ToastContainer, Zoom} from 'react-toastify';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Navigation from './Routing/Navigation';

export default function App() {
  const navigate = useNavigate()
  const location = useLocation();
  const authRoutes = ['/','/login', '/signup'];
  const isAuthPage = authRoutes.includes(location.pathname);

  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const user = localStorage.getItem('userCredentials');
    if(user){
      const parsed = JSON.parse(user);
      return parsed.IsLoggedIn || false
    }
    return false;
  });
  const [products, setProduct] = useState([]);


  useEffect(() => {
    const Userstr = localStorage.getItem('userCredentials');
    if (Userstr) {
      try{
        const U = JSON.parse(Userstr);
         if(U.IsLoggedIn){
          setIsLoggedIn(true)
          if(window.location.pathname === "/" || window.location.pathname === "/login")
          navigate("/home", { replace: true });
         }
        
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