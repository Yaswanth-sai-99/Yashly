import React, { useState } from 'react'
// import "/"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Form({setIsLoggedIn}) {

  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [Error, setError] = useState({
    UserNameError : '',
    PasswordError : ''
  })
 
// const handleLogin = (e) => {
//     e.preventDefault();
//     const storeduser = JSON.parse(localStorage.getItem('userCredentials'));
     
//     if (!storeduser) {
//       toast.warn("No User Found!");
//       return;
//     }

//     let NewError = {UserNameError:'',PasswordError:''};
//     let isValid = true;

//     if(username === ''){
//       NewError.UserNameError = "Please Enter Your Username"; 
//       isValid = false
//     }
//     else if (storeduser.name !== username){
//       NewError.UserNameError = "Username is Incorrect! Please Login with Registered Username";
//       toast.warn("Username is Incorrect")
//       isValid = false
//     }
    
//     else if(password === ''){
//       NewError.PasswordError = "Please Enter Your Password";
//       isValid = false
//     }
//     else if (storeduser.password !== password){
//       NewError.PasswordError = "Password is Incorrect! Please Enter your Registered password";
//       toast.warn("password is Incorrect")
//       isValid = false
//     }
    
//    if (storeduser.name === username && storeduser.password === password) {
//       toast.success("Loged in Sucessfully")

//       const updatedUser = { ...storeduser, IsLoggedIn: true };
//       localStorage.setItem('userCredentials', JSON.stringify(updatedUser));
     
//       navigate("/home",{replace:true});
//       setIsLoggedIn(true);
//       return;
//     }
    
    
//       setError({...NewError});
//       return isValid;
//   };


// Function to hash the password for comparison
async function hashPassword(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const handleLogin = async (e) => { // Added async
  e.preventDefault();
  const storedData = localStorage.getItem('userCredentials');
  
  if (!storedData) {
    toast.warn("No User Found!");
    return;
  }

  const storeduser = JSON.parse(storedData);
  let NewError = { UserNameError: '', PasswordError: '' };
  
  // 1. Hash the password the user just typed
  const hashedPasswordInput = await hashPassword(password);

  // 2. Validate
  if (username === '') {
    NewError.UserNameError = "Please Enter Your Username";
  } else if (storeduser.name !== username) {
    NewError.UserNameError = "Username is Incorrect!";
    toast.warn("Username is Incorrect");
  } else if (password === '') {
    NewError.PasswordError = "Please Enter Your Password";
  } else if (storeduser.password !== hashedPasswordInput) { // Compare hashes
    NewError.PasswordError = "Password is Incorrect!";
    toast.warn("Password is Incorrect");
  } else {
    // SUCCESS CASE
    toast.success("Logged in Successfully");
    const updatedUser = { ...storeduser, IsLoggedIn: true };
    localStorage.setItem('userCredentials', JSON.stringify(updatedUser));
    setIsLoggedIn(true);
    navigate("/home", { replace: true });
    return;
  }

  setError({...NewError});
};

  return (

    <div className='relative'>
      <div className='bg-[url("/form1.png")] bg-cover bg-center bg-no-repeat w-full min-h-screen '>
        <h1 className='bg-[url("/form3.jpg")] text-8xl font-black mx-50 py-5 bg-contain bg-no-repeat bg-clip-text text-transparent animate-bg-slide transition-transform duration-300 ease-in-out inline-block'>YASHLY</h1>
        <h2 className='text-4xl px-10 mx-50 font-semibold font-futuristic bg-gradient-to-r from-purple-400 via-green-500 to-blue-600 bg-clip-text text-transparent'><i>Welcome Back....</i></h2>
      </div>
      <div className="form-container absolute right-30 top-8">
        <p className="title">Login</p>
        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} id="username" placeholder="" onChange={e => setUserName(e.target.value)}/>
            {Error.UserNameError && <p className="text-red-500 text-xs whitespace-pre-line mb-2">{Error.UserNameError}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} id="password" placeholder="" onChange={e => setPassword(e.target.value)} />
            {Error.PasswordError && <p className="text-red-500 text-xs whitespace-pre-line mb-2">{Error.PasswordError}</p>}
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
            </div>
          </div>
          <input className="sign" type='submit' value="Sign In"/>
        </form>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>
        <div className="social-icons">
          <button aria-label="Log in with Google" className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            ></svg>
          </button>
          <button aria-label="Log in with Twitter" className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            ></svg>
          </button>
          <button aria-label="Log in with GitHub" className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            ></svg>
          </button>
        </div>
        <p className="signup">
          Don't have an account?
          <Link to="/signup" className="ps-3">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
