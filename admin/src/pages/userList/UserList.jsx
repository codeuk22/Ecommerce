import "./userList.css";
import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { CloudOff, DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {userRequest } from "../../requestMethods";

export default function UserList() {

  const [data, setData] = useState([]);

  useEffect(()=>{  
    getUser();
  },[])

  const getUser= async()=>{
    try{
          const res=await axios.get("http://localhost:5000/api/users")
          if(res){
            setData(res.data)
          }
    }
    catch(error){
      console.log("error for user ",error);
    }
  }


  const handleDelete = async (id) => {
    // setData(data.filter((item) => item.id !== id));
    try{
      const res=await userRequest.delete(`/users/${id}`);
      if(res){
        alert("User has been Deleted");
        window.location.reload();
      }
    }catch(e){
      console.log(e);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Username",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: 'fname',
      headerName: "First Name",
      width: 160,
    },
    {
      field: 'lname',
      headerName: "Last Name",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}