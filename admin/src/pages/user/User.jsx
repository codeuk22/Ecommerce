import React, { useEffect, useState } from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { publicRequest } from "../../requestMethods";

export default function User() {


  const [username, setUsername] = useState(username);
  const [fname, setFname] = useState(fname);
  const [lname, setLname] = useState(lname);
  const [email, setEmail] = useState(email);
  const [phone, setPhone] = useState(phone);
  const [address, setAddress] = useState(address);

  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [user, setUser] = useState([]);

  const updateUser = async () => {
    try {
      const res = await publicRequest.put(`/users/${userId}`, {
        fname,
        lname,
        username,
        email,
        phone,
        address,
        username
      });

      if (res) alert("User Data has been Updated");

    } catch (e) {
      console.log(e);
    }
  }

  const getUserData = async () => {

    try {
      const res = await publicRequest.get(`/users/find/${userId}`);
      if (res) setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{`${user.fname} ${user.lname}`}</span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              {/* <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div> */}
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                {/* <PhoneAndroid className="userShowIcon" /> */}
                {/* <span className="userShowInfoTitle">+1 123 456 67</span> */}
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{user.address}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                    onChange={(e) => { setUsername(e.target.value) }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder={user.fname}
                    className="userUpdateInput"
                    onChange={(e) => { setFname(e.target.value) }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder={user.lname}
                    className="userUpdateInput"
                    onChange={(e) => { setLname(e.target.value) }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={user.email}
                    className="userUpdateInput"
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder={user.phone}
                    className="userUpdateInput"
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder={user.address}
                    className="userUpdateInput"
                    onChange={(e) => { setAddress(e.target.value) }}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    {/* <Publish className="userUpdateIcon" /> */}
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button onClick={updateUser} className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}