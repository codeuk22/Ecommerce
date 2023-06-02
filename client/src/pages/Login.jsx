import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux';
// import { login } from "../redux/apiCalls";
import { publicRequest } from '../requestMethods';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)
), url("https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1179&q=80") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
/* background-color: white; */
background: rgba( 255, 255, 255, 0.45 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4.5px );
-webkit-backdrop-filter: blur( 4.5px );
border-radius: 10px;
width: 25%;

padding: 20px;
/* background-color: white; */
${mobile({ width: "75%" })}
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
font-size: 20px;
font-weight: 600;
flex:1;
border-radius: 20px;
border: none;
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
  // const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    // login(dispatch, { username, password });


    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      username: username,
      password: password,
    }
    try {
      await publicRequest.post("/auth/login", body, config).then((res) => {
        console.log("response ", res.data.email)
        const data = localStorage.setItem("user", JSON.stringify(res.data))
        //  setUser(res.data.email)
        if (res.data.username === username) {
          // setUser(res.data)
          alert(`Login successfully`);
          // console.log("user is ", user)
          navigate("/");
        } else {
          alert("Invalid Username or Password")
        }

      }).catch((e) => {
        console.log(e);
      })
    } catch (e) {
      console.log("Some error occurs");
    }
  }

  return (
    <Container>
      <Wrapper >
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="Username" autoComplete=''
            onChange={(e) => { setUsername(e.target.value) }}
          />
          <Input placeholder="Password"
            autoComplete=''
            type="password"
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong...</Error>}
          <Lin>DO NOT REMEMBER PASSWORD ?</Lin>
          <Link to="/register">
            <Lin>
              CREATE A NEW ACCOUNT
            </Lin>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login;
