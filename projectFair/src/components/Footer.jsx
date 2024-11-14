import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{ height: "150px" }} className=" bg-dark mt-5 w-100 shadow ">
      <div className="d-flex justify-content-between">
        <div className="intro me-5">
          <h5>
            {" "}
            <i className="fa-solid fa-book me-2"></i>
            Project Fair
          </h5>
          <p>
            Designed and built with all the love <br /> in the world by the{" "}
            <br /> Luminar team with the help of our contributors. <br />{" "}
            <p> Code licensed Luminar, docs CC BY 3.0.</p>
          </p>
        </div>
        <div className="link">
          <h5 className="fw-bolder ms-4">Links</h5>
          <ul style={{ listStyle: "none" }} >
          <li><Link to={'/'} style={{textDecoration: 'none'}}>Home</Link></li>

          <li><Link to={'/'} style={{textDecoration: 'none'}}>Login</Link></li>
          <li><Link to={'/'} style={{textDecoration: 'none'}}>Register</Link></li>
          </ul>
        </div>
        <div className="guide ">
          <h5 className="fw-bolder ms-4 ">Guides</h5>
          <ul style={{ listStyle: "none"}}>
          <li><Link to={'/'} style={{textDecoration: 'none'}}>React</Link></li>

<li><Link to={'/'} style={{textDecoration: 'none'}}>Bootstrap</Link></li>
<li><Link to={'/'} style={{textDecoration: 'none'}}>React-Bootstrap</Link></li>
          </ul>
        </div>
        <div className="contact">
          <h5 className="fw-bolder ms-5 ">Contact Us</h5>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter Your mail Id"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          
        </div>
        
      </div >
      <p className="text-center   bg-dark">Copyright © 2024 Project Fair. Built with React.</p>
    </div>
  );
};

export default Footer;
