import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context,server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Header() {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);

  const handleLogout=async()=>{
    setLoading(true);
    try {
     
     const data =  await axios.get(
          `${server}/users/logout`,
          {
            withCredentials: true,
          }
          )
          
          toast.success(data.data.message);
        
          setIsAuthenticated(false);
          setLoading(false);
        
  } 
  catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      setIsAuthenticated(true);
  }

  }

  return (
    <nav className='header'>
        <div>
            <h2>Task Manager</h2>
        </div>

        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {

              isAuthenticated?<button disabled={loading} onClick={handleLogout} className='btn'>Logout</button>:
              <Link to={"/login"}>Login</Link>
            }
            
        </article>
    </nav>
  )
}
