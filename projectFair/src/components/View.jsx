import React, { useContext, useEffect,useState } from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { deleteProjectAPI, userProjectAPI } from '../service/allAPI'
import { addResponseContext, editResponseContext } from '../contexts/ContextShare'

const View = () => {
  const {editResponse,setEditResponse}=useContext(editResponseContext)

  const { addResponse, setAddResponse } =useContext(addResponseContext)
  const [userProjects,setUserProject]=useState([])

  useEffect(()=>{
    getUserProjects()
  },[addResponse,editResponse])

  console.log(userProjects);
  

const getUserProjects =async ()=>{
  const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
        " Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
       }
       try{

        const result = await userProjectAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setUserProject(result.data)
        }else{
          console.log(result);
          
        }
        
       }catch(err){
        console.log(err);
        
       }
}
}

const handleDeleteProject = async (pId)=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader ={
      " Content-Type": "application/json",
      "Authorization":`Bearer ${token}`
     }
     try{
const result = await deleteProjectAPI(pId,reqHeader)
if(result.status==200){
  getUserProjects()

}else{
  console.log(result);
  
}

     }catch(err){
      console.log(err);
      
     }
    }
}

  return (
    <>
    <div className="d-flex justify-content-between  mt-3">
      <h4 className="text-success p-2"><u>All Projects</u></h4>
      <div><Add/></div>
    </div>
    <div className="mt-3">
      {
        userProjects?.length>0?
        userProjects?.map(project=>(
<div key={project?._id} className="border rounded p-2 mb-3 mt-3 d-flex justify-content-between">
        <h5>{project?.title}</h5>
        <div className="d-flex align-items-center">
          <div><Edit project={project}/></div>
          <div className="btn"><a href={project?.github} target='_blank'><i className="fa-brands fa-github"></i></a></div>
          <button onClick={()=>handleDeleteProject(project?._id)} className="btn"><i className="fa-solid fa-trash text-danger"></i></button>
        </div>
      </div>
        )):
<div className='fw-bolder text-danger m-5 text-center'>Project Not found!!!</div>
      }
    </div>
    
    </>
  )
}

export default View