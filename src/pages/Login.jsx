import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Context, server } from '../main';
import toast from 'react-hot-toast';

export default function Login() {
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  console.log("Auth on login is ",isAuthenticated);
  if(isAuthenticated){
    return <Navigate to={"/"}></Navigate>
   }
  const handleSubmit = async(e)=>{
      e.preventDefault();
      setLoading(true);
      try {
          const data = await axios.post(
              `${server}/users/login`,
              {
                  email,password
              },
              {
                headers:{
                  "Content-Type":"application/json"
                },
                
                withCredentials: true,
              }
              )
              toast.success(data.data.message);
              setIsAuthenticated(true);
              setLoading(false);

      } 
      catch (error) {
          toast.error(error.response.data.message)
          console.log(error);
          setIsAuthenticated(false);
          setLoading(false);
      }
   
      
          
  }

  return (
    <div className='login'>

        <section>
            <form onSubmit={handleSubmit} >
                
                <input type='email'
                 value={email} placeholder='Email' 
                 onChange={(e)=>setEmail(e.target.value)}>
                 </input>

                <input type='password'
                 value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                   placeholder='Password'>
                   </input>
                    
                <button disabled={loading} type="submit">Submit</button>
                <h4>OR</h4> 
                <Link to={"/register"}>Sign Up</Link>
            </form>
        </section>

    </div>
  )
}
