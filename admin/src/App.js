import React from "react";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

function App() {
console.log(localStorage.getItem("persist:root"))
const admin=JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.isAdmin;

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        {admin && (
        <Routes>
          <Route exact  path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser/>}/>
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productsId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>)}
      </div>
      </>
  );
}

export default App;
