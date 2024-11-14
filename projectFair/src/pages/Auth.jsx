import React, { useContext, useState } from "react";
import signin from "../assets/signin.jpg";
import {loginAPI, registerAPI} from "../service/allAPI"
import { FloatingLabel, Form ,Spinner} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthContext } from '../contexts/AuthContext'


const Auth = ({ insideRegister }) => {

  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const [isLoading,setIsLoading]=useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // console.log(userData);

  const handleRegister= async(e)=>{
    e.preventDefault()
    if(userData.username && userData.email &&userData.password){
      // api call
      try{
        const result = await registerAPI(userData)
        if(result.status==200){
          alert(`Welcome ${result?.data?.username}... Please Login to Explore our website !!!`)
          setUserData({username:"",email:"",password:""})
          navigate('/login')
        }else{
          if(result.response.status==406){
            alert(result.response.data)
            setUserData({username:"",email:"",password:""})  
        }
      }
     }catch(err){
        console.log(err);
}

    }else{
      alert("Please fill the form Completely!!!")
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    if(userData.email && userData.password){
      // api call
      try{
        const result = await loginAPI(userData)
        console.log(result);
        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          setIsLoading(true)
          setTimeout(() => {
            setUserData({username:"",email:"",password: ""})
          navigate('/')
          setIsLoading(false)
            
          }, 2000);

        }else{
          if(result.response.status==404){
            alert(result.response.data)
          }
        }
        
      }catch(err){
        console.log(err);
        
      }
    }else{
      alert("Please fill the form Completely!!!")
    }
  }
  

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className="w-100" src={signin} alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className="fw-bolder mt-2">
                <i className="fa-brands fa-docker"></i>Project Fair
              </h1>
              <h5 className="fw-bolder mt-2">
                Sign {insideRegister ? "Up" : "In"} to Your Account
              </h5>

              {/* form */}
              <Form className="mt-5">
                {insideRegister && (
                  <FloatingLabel
                    controlId="floatingInput"
                    
                    label="Username"
                    className="mb-3 "
                  >
                    <Form.Control  value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} type="text" placeholder="Username" />
                  </FloatingLabel>
                )}

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control  value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control  value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} type="password" placeholder="Password" />
                </FloatingLabel>

                {insideRegister ? (
                  <div className="mt-3">
                    <button onClick={handleRegister} className="btn btn-success">Register</button>
                    <p className="mt-3">
                      Already have an Account? Click here to{" "}
                      <Link to={"/login"}>Login</Link>
                    </p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <button className="btn btn-success " onClick={handleLogin}>Login
                     {/* spinner */}
                    { isLoading &&
                      <Spinner animation="border" variant="light" />  }
                    
                    </button>
                    <p className="mt-3">
                      New User? Click here to{" "}
                      <Link to={"/register"}>Register</Link>
                    </p>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
