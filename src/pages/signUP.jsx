import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'


// Hashing helper function
async function hashPassword(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
function Signup() {

  const [userdetails, setUserDetails] = useState({ name: "", email: "", password: '', confirm_password: "" });
  const navigation = useNavigate();
  const [Errors, setErrors] = useState({
    E_name : '',
    E_email : '',
    E_password :'',
    E_Confirm_password :''
  }
  );
  const pattern = {
    Un : /^[A-Z][a-z0-9]{3,15}$/,
    p_email : /^[\w.-]+@[\w.-]+\.\w{2,}$/,
    pw : /^[A-Z](?=.*[!@#$%&*_-])[\w!@#$%&*_-]{9,}$/
  };

  function verify(){
    const NewError = { E_name: '', E_email: '', E_password: '', E_Confirm_password: '' };
    const SamePattern = {...pattern}
    let isValid = true;

    if(userdetails.name === ''){
      NewError.E_name = "Please Enter UserName";
      isValid = false;
    } else if (!SamePattern.Un.test(userdetails.name)){
      NewError.E_name = "• First Letter must be a Capital letter\n• Minimum 3 characters required\n• special characters allowed";
      isValid = false;
    }
    
    else if(userdetails.email === ''){
      NewError.E_email = "Please Enter Your Email";
      isValid = false;
    } else if (!SamePattern.p_email.test(userdetails.email)){
      NewError.E_email = "Invalid Email";
      isValid = false;
    }
    
    else if(userdetails.password === ''){
      NewError.E_password = "Please Enter Password";
      isValid = false;
    } else if (!SamePattern.pw.test(userdetails.password)){
      NewError.E_password = "Invalid Password pattern \n• Must start with a Capital letter\n• Minimum 10+ characters required\n• Include special character";
      isValid = false;
    }
    
  // confirm password validation 
    else if (userdetails.confirm_password !== userdetails.password){
      NewError.E_Confirm_password = "Password Do not Match";
      isValid = false;
    }
    setErrors({ ...NewError});
    return isValid;
  }

  // function handleSignUP(e) {
  //     if(e) e.preventDefault();
    
  //   const Existing_User = JSON.parse(localStorage.getItem("userCredentials"));
  //   if (Existing_User && Existing_User.email === userdetails.email){
  //     toast.warn("Already a Yashly user! Please Login");
  //     return;
  //   }

  //   if(verify()){
  //   const updateduser = { ...userdetails, IsLoggedIn: false };
  //   localStorage.setItem("userCredentials", JSON.stringify(updateduser))
  //   toast.success(' Signed Up Succesfully ')
  //   navigation('/login');
  //   } else {
  //     toast.error("Please Correct the Errors")
  //   }
  // }

  const handleSignUP = async (e) => {
    e.preventDefault();

    const existingUser = JSON.parse(localStorage.getItem("userCredentials"));
    if (existingUser && existingUser.email === userdetails.email) {
      toast.warn("Already a Yashly user! Please Login");
      return;
    }

    if (verify()) {
      const hashedPassword = await hashPassword(userdetails.password);
      const userToSave = {
        name: userdetails.name,
        email: userdetails.email,
        password: hashedPassword,
        IsLoggedIn: false
      };

      localStorage.setItem("userCredentials", JSON.stringify(userToSave));
      toast.success('Signed Up Successfully');
      navigation('/login');
    } else {
      toast.error("Please Correct the Errors");
    }
  };

  return (
    <div className='relative'>
      <div className='bg-[url("/form1.png")] bg-cover bg-center bg-no-repeat w-full min-h-screen '>
        <h1 className='bg-[url("/form3.jpg")] text-8xl font-black mx-50 py-5 bg-contain bg-no-repeat bg-clip-text text-transparent animate-bg-slide transition-transform duration-300 ease-in-out inline-block'>YASHLY</h1>
        <h2 className='text-4xl px-10 mx-40 font-semibold font-futuristic bg-gradient-to-r from-purple-400 via-green-500 to-blue-600 bg-clip-text text-transparent'><i>Welcome to Our family</i></h2>
      </div>
      <div className="login absolute right-30 top-8 bg-clip-text bg-transparent backdrop-blur-md p-4">
        <div className="hader">
          <span className='text-white'>Join us today!</span>
          <p>Sing up now to become a member.</p>
        </div>
        <form onSubmit={handleSignUP} >
          <input type="text" placeholder="Enter Name" required="" className='text-white' value={userdetails.name} onChange={e => setUserDetails({...userdetails, name:e.target.value})} />
          {Errors.E_name && <p className="text-red-500 text-xs whitespace-pre-line mb-2">{Errors.E_name}</p>}
          <input type="email" placeholder="Enter Email" required="" className='text-white' value={userdetails.email} onChange={e => setUserDetails({...userdetails, email:e.target.value})} />
          {Errors.E_email && <p className="text-red-500 text-xs whitespace-pre-line mb-2">{Errors.E_email}</p>}
          <input type="password" placeholder="Choose A Password" required="" className='text-white' value={userdetails.password} onChange={e => setUserDetails({...userdetails, password:e.target.value})}/>
          {Errors.E_password && <p className="text-red-500 text-xs whitespace-pre-line mb-2">{Errors.E_password}</p>}
          <input type="password" placeholder="Re-Enter Password" required="" className='text-white' value={userdetails.confirm_password} onChange={e => setUserDetails({...userdetails, confirm_password:e.target.value})}/>
          {Errors.E_Confirm_password && <p className="text-red-500 text-xs whitespace-pre-line mb-2">{Errors.E_Confirm_password}</p>}
          <input type="submit" value="Signup" className='text-green-900 font-bold  bg-green-100' />
          <span> Already a member? <Link to="/login">Login Here</Link></span>
        </form>
      </div>

    </div>
  )

}
export { Signup };


