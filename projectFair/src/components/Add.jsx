import React,{useEffect, useState} from 'react'
import { Modal,Button } from 'react-bootstrap'
import uploadImg from '../assets/uploadImg.jpg'
import { addProjectAPI } from '../service/allAPI'
import { useContext } from 'react'
import { addResponseContext } from '../contexts/ContextShare'

const Add = () => {

  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [preview,setPreview] = useState(uploadImg)

  const [projectData,setProjectData] = useState({
    title:"",language:"",overview:"",github:"",website:"",projectImg:""
  })
  console.log(projectData);

  const [show, setShow] = useState(false);

  useEffect(()=>{
    if(projectData.projectImg.type=="image/png" || projectData.projectImg.type=="image/jpg" || projectData.projectImg.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectData.projectImg))
    }else{
      setImageFileStatus(false)
      setPreview(uploadImg)
      setProjectData({...projectData,projectImg:""})
    }
  },[projectData.projectImg])

  const handleClose = () => {
    setShow(false);
    setProjectData({ title:"",language:"",overview:"",github:"",website:"",projectImg:""})
  }
  const handleShow = () => setShow(true);


  const handleSaveProject =async ()=>{
    const {title,language,overview,github,website,projectImg}=projectData
    if(title && language && overview && github && website && projectImg){
      // api call-post request
      // reqBody must be in formData since data contains files
    const reqBody = new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("projectImg",projectImg)

    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
       " Content-Type": "multipart/form-data",
       "Authorization":`Bearer ${token}`
      }
      // api call -post request
      try{
        const result=await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          handleClose()
          // alert("Project Added  Successfully")
          // share result via context
          setAddResponse(result)

        }else{
          alert(result.response.data)
        }
        

      }catch(err){
        console.log(err);
        

      }
    }

    }else{
      alert("Please fill the form completely!!!")
    }
  }

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary"><i className="fa-solid fa-plus"></i> New Project</button>
      <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e=>setProjectData({...projectData,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
                <img height={'200px'} className='img-fluid' src={preview} alt="" />
              </label>
              { !imageFileStatus && <div className="text-warning fw-bolder my-2">*Upload only the following types (jpeg,jpg,png) here!!!</div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} placeholder='Project Title' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectData.language} onChange={e=>setProjectData({...projectData,language:e.target.value})} placeholder='Laguages used in project' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} placeholder='Project Overview' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} placeholder='Project Github link' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} placeholder='Project website link' type="text" className="form-control" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
