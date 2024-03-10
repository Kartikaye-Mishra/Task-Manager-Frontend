import React, { useContext, useEffect, useState } from 'react'
import { Context,server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

export default function Home() {

  const{isAuthenticated} = useContext(Context);
  const[title,setTitle] = useState("");
  const[description,setDescription] = useState("");
  const[loading,setLoading]=useState(false);
  const[tasks,setTasks]=useState([]);
  const[refresh,setRefresh] = useState(false);

  const updateHandler=async(id)=>{
    try {
     const {data} = await axios.put(`${server}/tasks/${id}`,
     {},
     {
      withCredentials:true
     })
     toast.success(data.message);
     setRefresh((prev)=>!prev);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    
   
  }
  const deleteHandler=async(id)=>{
    try {
      const {data}= await axios.delete(`${server}/tasks/${id}`,
      {
       withCredentials:true
      })
      toast.success(data.message);
      setRefresh((prev)=>!prev);
     } catch (error) {
       console.log(error);
       toast.error(error.response.data.message)
     }
     
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
        const data = await axios.post(
            `${server}/tasks/new`,
            {
                title,description
            },
            {
              headers:{
                "Content-Type":"application/json"
              },
              
              withCredentials: true,
            }
            )
            toast.success(data.data.message);
            setRefresh((prev)=>!prev);
       
            setLoading(false);
            setTitle("");
            setDescription("");
    } 
    catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
        setLoading(false);
    }
 
    
        
}
useEffect(() => {
setLoading(true);
  axios.get(
    `${server}/tasks/all`,
    {
      withCredentials:true,
    }
    ).then(res=>{
     setLoading(false);
     setTasks(res.data.tasks);
      
    }
    ).catch((e)=>{
      toast.error(e.res.data.message);
      console.log(e);
      setLoading(false);
    })


}, [refresh])

if(!isAuthenticated){
  
  return(
    <Navigate to={"/login"}/>
  )
}
  return (
  //  !isAuthenticated ? <div>Home</div>: 
   <div className="container">

    <div className='login'>

<section>
      <form onSubmit={handleSubmit} >
                
                <input type='text'
                 value={title} placeholder='Title' 
                 onChange={(e)=>setTitle(e.target.value)}>
                 </input>

                <input type='text'
                 value={description} placeholder='Description' 
                 onChange={(e)=>setDescription(e.target.value)}>
                 </input>

                <button  type="submit">Submit</button>
               
            </form>
            </section>
            </div>

      <section className="todosContainer">
        <div className='todoItems' style={{ width: '100%' }}>
          {
          tasks.map((i)=>(
          
            <TodoItem  title={i.title} description={i.description} isCompleted={i.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={i._id} key={i._id}></TodoItem>
          ))}

        </div>
      </section>
    </div>
  )
}
