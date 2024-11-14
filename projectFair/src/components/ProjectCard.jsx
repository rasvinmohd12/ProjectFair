import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import SERVERURL from '../service/serverUrl'


const ProjectCard = ({displayData}) => {

  const [show,setShow]=useState(false)
  const handleClose=()=>setShow(false)
  const handleShow=()=>setShow(true)
  return (
    <>
    {/* card */}
    <Card onClick={handleShow} className='shadow btn'>
      <Card.Img height={'200px'} variant="top" src={`${SERVERURL}/uploads/${displayData?.projectImg}`} />
      <Card.Body>
        <Card.Title className='text-dark'>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>
    {/* modal */}
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{displayData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
            <img  className= "img-fluid"src={`${SERVERURL}/uploads/${displayData?.projectImg}`} />
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h6><span className='fw-bolder'>{displayData?.languages}  :</span><span className='text-secondary'>HTML,CSS & JS</span></h6>
              <p style={{textAlign:"justify"}}> <span className='fw-bolder'>Project Preview :</span>{displayData?.overview}</p>
            </div>
          </div>
          <div className="float-start ms-5 ">
            <a className='btn btn-primary' href={displayData?.github} target='_blank'><i className='fa-brands fa-github'></i></a>
            <a className='btn btn-primary ms-3' href={displayData?.website} target='_blank'><i className='fa-solid fa-link'></i></a>

          </div>
        </Modal.Body>
       
      </Modal>

    </>
  )
}

export default ProjectCard