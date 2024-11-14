import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import landing from  '../assets/landing.png'
import { Card } from 'react-bootstrap'
import { homeProjectAPI } from '../service/allAPI'

const Home = () => {
  
const [allHomeProjects,setAllHomeProjects]=useState([])
console.log(allHomeProjects);


  const navigate = useNavigate()

useEffect(()=>{
  getAllHomeProjects()
},[])

  const getAllHomeProjects= async ()=>{
    try{
      const result= await homeProjectAPI()
      if(result.status==200){
        setAllHomeProjects(result.data)
      }

    }catch(err){
      console.log(err);
      
    }
  }
  
const handleProjects=()=>{
  if(sessionStorage.getItem("token")){
  navigate ('project')
  }else{
    alert("Please login to get full access to our projects!!!")
  }
}

  return (
    <>
    <div style={{minHeight:'100hv'}} className="d-flex justify-content-center align-items-center rounded w-100 mt-5">

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 style={{fontSize:"50px"}}><i className='fa-brands fa-docker'></i>Project Fair

            </h1>
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut rerum nesciunt et molestias consequuntur facilis quidem similique esse facere magni tempora quas voluptatum temporibus eligendi veniam dicta, soluta, obcaecati natus!</p>
{
  sessionStorage.getItem("token")?
  <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>

  :
  <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>

}

          </div>
          <div className="col-lg-6">
          <img className='img-fluid mb-5' src={landing}  />
          </div>
          
        </div>
      </div>
    </div>
    {/* explore project  part*/}
    <div className='my-5 text-center'>
      <h1 className='mb-5'>Explore Our Project</h1>
      <marquee>
        <div className='d-flex'>
         {
          allHomeProjects?.length>0 &&
          allHomeProjects?.map(project=>(
            <div key={project?._id} className='me-5'>
            <ProjectCard displayData={project}/>
          </div>
          ))  
                 }
        </div>
      </marquee>
      <button onClick={handleProjects} className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE PROJECTS ...</button>
    </div>
    {/* testimonial part*/}
<div className="d-flex justify-content-center align-items-center flex-column " >
  <h1>Our Testimonials</h1>
  <div className="d-flex justify-content-center align-items-center mt-3 w-100 gap-4">
    {/* card  */}
  <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'><img className='rounded-circle img-fluid' src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="" width={'80px'} height={'80px'}/><span>Ryle Kincaid</span></Card.Title>
        <Card.Text>
         <div className='d-flex justify-content-center align-items-center'>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
         </div>
         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus modi atque deleniti ut quisquam, voluptas laborum repellat </p>
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'><img className='rounded-circle img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfVh1kRk18Z1Hjhhb4ptkSR_21NKsyJfjvmA&s" alt="" width={'80px'} height={'80px'}/> <span>Lilly Bloom</span></Card.Title>
        <Card.Text>
         <div className='d-flex justify-content-center align-items-center'>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
         </div>
         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus modi atque deleniti ut quisquam, voluptas laborum repellat </p>
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column ' ><img className='rounded-circle img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlvcJSJgrLlqVEQ1XNM3GzT0qGSyBX5jg1nd5Xn7_krVmMVL3gXR5u6TaU1q8xS4FNV6k&usqp=CAU" alt="" width={'80px'} height={'80px'}/> <span>Atlas Corrigan</span> </Card.Title>
        <Card.Text>
         <div className='d-flex justify-content-center align-items-center'>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
         </div>
         <p style={{textAlign:"justify"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus modi atque deleniti ut quisquam, voluptas laborum repellat </p>
        </Card.Text>
        
      </Card.Body>
    </Card>
  </div>
</div>
    </>
  )
}

export default Home