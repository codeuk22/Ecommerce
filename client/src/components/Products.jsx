import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';
import axios from "axios";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from '@material-ui/core';
import { mobile } from "../responsive";


const Container=styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`
const SearchContainer = styled.div`
border:0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`
const Input = styled.input`
border: none;
outline: none;
&:hover{
  border: none;
}
${mobile({ width: "50px" })}
`
const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`

const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({ display: "none" })}
`

const TopButton = styled.button`
padding: 10px 10px;
font-weight: 600;
cursor: pointer;
height: 30px;
margin-left: 25px;
width: 70px;
display: flex;
align-items: center;
`

const Products = ({cat,filters,sort}) => {
  
  const [products,setProducts]=useState(popularProducts);
  const [filteredProducts,setFilteredProducts]=useState([]);
    const [searchText,setSearchText]=useState("")

  useEffect(()=>{
    
    getProducts();
  },[cat]);
  
  const handleChange=(e)=>{
    setSearchText(e.target.value);
    if(e.target.value==""){
     getProducts();
    }
}
  const getProducts= async ()=>{
    try{
      const res=await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products");
      console.log(res)
      setProducts(res.data);
    }catch(e){
      console.log(e)
    }
  };

  useEffect(()=>{
    cat && setFilteredProducts(
      products.filter(item=>Object.entries(filters).every(([key,value])=>
      item[key].includes(value)
      ))
    )
  },[products,cat,filters]);


  useEffect(()=>{
    if((sort==="newest")){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.createdAt-b.createdAt));
    }else if((sort==="asc")){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.price-b.price));
    }else{
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>b.price-a.price));
    }
  },[sort]);


  

  const handleSearch=()=>{
    let arr=[];
    console.log(products)
    for(let i=0;i<products?.length;i++){
      if(products[i].title==searchText){
        arr.push(products[i]);
      }
    }
    // console.log("funs is caleeed")
    setProducts(arr);
    console.log("arr is ",arr);
  }


  console.log(filteredProducts);

  return (
    // <Container>
    //   {cat 
    //   ? filteredProducts.map((item)=><Product item={item} key={item.id}/> )
    //   :products.slice(0,10).map((item)=> <Product item={item} key={item.id}/> )}
    // </Container>
    <>
       <Left>
          {/* <Language>BM</Language> */}
          <SearchContainer>
            <Input placeholder="Search" onChange={handleChange}/>
            {/* <Search style={{ color: "gray", fontSize: 16 }} /> */}
          </SearchContainer>
          <TopButton onClick={handleSearch}>Search </TopButton>
        </Left>

    <Container>

      {products.slice(0,20).map((item)=> <Product item={item} key={item.id} cat={cat}/> )}
    </Container>
    
</>
  )
}

export default Products;
