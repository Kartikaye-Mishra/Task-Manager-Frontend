import React from 'react'

export default function TodoItem({title,description,isCompleted,updateHandler,deleteHandler,id}) {
  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
            <input type="checkbox" checked={isCompleted} onChange={()=>updateHandler(id)}/>
            <button type="button" className='btn' onClick={()=>deleteHandler(id)}>DELETE</button>
        </div>
    </div>
  )
}
