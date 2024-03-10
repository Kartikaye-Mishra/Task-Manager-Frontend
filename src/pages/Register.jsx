import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Context, server } from '../main';
import toast from 'react-hot-toast';


export default function Register() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

    console.log("Auth is ",isAuthenticated);
    if(isAuthenticated){
      return <Navigate to={"/"}></Navigate>
     }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const data = await axios.post(
                `${server}/users/new`,
                {
                    name,email,password
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
                
                <input 
                value={name}
                type='text'
                placeholder='Name'
                onChange={(e)=>setName(e.target.value)}
                required>
                </input>

                <input
                value={email}
                type='email'
                placeholder='Email'
                onChange={(e)=>setEmail(e.target.value)}
                required >
                </input>

                <input 
                value={password} 
                type='password' 
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)} 
                required>
                </input>

                <button disabled={loading} type="submit">Sign Up</button>
                <h4>OR</h4> 
                <Link to={"/login"}>Login</Link>
            </form>
        </section>

    </div>
  )
}
