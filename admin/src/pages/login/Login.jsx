import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux';

import { publicRequest } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import back from "./backadmin.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import {toast} from 'react-toastify/dist/react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)
), url("https://images.unsplash.com/photo-1603252109360-909baaf261c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
width: 25%;
padding: 20px;
background-color: white;
background: rgba( 255, 255, 255, 0.45 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4.5px );
-webkit-backdrop-filter: blur( 4.5px );
border-radius: 10px;




`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const Input = styled.input`
flex:1;
border-radius: 20px;
border: none;
font-weight: 600;
font-size: 20px;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
min-width: 40%;
margin:10px 0px;
padding: 10px;
`
const Button = styled.button`
border-radius: 20px;

width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
margin-bottom: 10px;
&:disabled{
    color:green;
    cursor: not-allowed;
}
`
const Lin = styled.a`
margin: 5px 0px;
font-size: 12px;
text-decoration: none;
/* text-decoration: underline; */
cursor: pointer;

`
const Error = styled.span`
color:red;
`



const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  // const showNotificationDelete = () => {
  //   toast.success("Login Successfully!! ", {
  //     autoClose: 2000,
  //   });
  // }

      


  const handleClick = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    const body = {
      username,
      password,
    };

    try {
      const res = await publicRequest.post("/auth/admin/login", body, config);
      const { username: resUsername, isAdmin, _id } = res.data;

      if (resUsername === username && isAdmin) {
        localStorage.setItem("user", JSON.stringify(_id));
        // alert(`Login successful`);
        navigate("/");
        // showNotificationDelete()
        window.location.reload();


      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while trying to log in");
    }
  };

  return (
    <Container >
      <Wrapper >
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            autoComplete="off"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>LOGIN</Button>
          <Lin>DO NOT REMEMBER PASSWORD ?</Lin>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;