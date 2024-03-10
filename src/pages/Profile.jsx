import React, { useContext,useEffect } from 'react'
import { Context,server } from '../main'
import axios from 'axios'
import Loader from '../components/Loader';
export default function Profile() {

  const {user,loading} = useContext(Context)
  
  console.log("Current User is: ",user);
  return (
    
   
    loading?<Loader /> : (<div>
      <h1>Name {user?.name}</h1>
      <h1>Email {user?.email}</h1>
    </div>)
   
  )
}
