import React, { useState } from 'react';
import "./newUser.css";
import { publicRequest } from '../../requestMethods';

function NewUser() {

  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const createUser = async () => {
    if (username === "" || fname === "" || lname === "" || password === "" || phone === "" || email === "" || address === "") {
      alert("Plz fill All the Fields");
    } else {
      try {
        const res = await publicRequest.post("/auth/register", {
          username,
          fname,
          lname,
          password,
          phone,
          email,
          address
        })
        if (res){
          alert("User has been Created");
          window.location.reload();
        } 
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="rks" onChange={(e) => { setUsername(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>First Name</label>
          <input type="text" placeholder="Rahul" onChange={(e) => { setFname(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input type="text" placeholder="Sharma" onChange={(e) => { setLname(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="rks@gmail.com" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="97xxxxxxx40" onChange={(e) => { setPhone(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="Haridwar Uttarakhand" onChange={(e) => { setAddress(e.target.value) }} />
        </div>
        {/* <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        {/* <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div> */}
      </form>
      <button onClick={createUser} className="newUserButton">Create</button>
    </div>
  )
}

export default NewUser;
