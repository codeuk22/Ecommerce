import React from 'react'
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToAppOutlined } from "@material-ui/icons";
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate,Link} from "react-router-dom";
import Login from '../../pages/login/Login';

const Button = styled.button`
background:transparent;
border:none;
font:15px;
margin-right: 3px;
margin-left: 15px;
cursor:pointer;
&:hover{
  color: blue;
}
`

function Topbar() {

    const navigate=useNavigate();

    const [data, setData] = useState();

    useEffect(() => {
        getSetuser();
    }, [])

    const getSetuser = () => {
        const user = localStorage.getItem("user")
        setData(user)
    }
    const handleClick = () => {
        localStorage.clear();
        navigate('/login')
        window.location.reload();
        getSetuser();
    }





    return (
        <div className="topbar">
            <div className='topbarWrapper'>
                <div className='topLeft'>
                    <span className='logo'>RKS</span>
                </div>
                <div className='topRight'>
                    <div className="topbarIconContainer">
                        {/* <NotificationsNone/> */}
                        {/* <span className='topIconBadge'>2</span> */}
                    </div>
                    <div className="topbarIconContainer">
                        {/* <Language/> */}
                        {/* <span className='topIconBadge'>2</span> */}
                    </div>
                    <div className="topbarIconContainer">
                        {/* <Settings/> */}
                    </div>
                    {!data? <>
                    <Link to="/login">
                        <Login/>
                    </Link>
                    </>:
                    <>
                    <img src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="topAvatar" />
                    <Button onClick={handleClick}> <ExitToAppOutlined /> </Button>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Topbar;
