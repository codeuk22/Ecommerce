import React, { useEffect, useState } from 'react'
import "./featuredInfo.css"
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";
import { userRequest } from '../../requestMethods';

function FeaturedInfo() {

  const [income,setIncome]=useState([]);
  const [perc,setPerc]=useState(0);

  useEffect(()=>{
    const getIncome=async ()=>{
      try{
        const res=await userRequest.get("/orders/income")
        console.log("ti",res)
        setIncome(res.data);
        setPerc(res.data[1].total*100/res.data[0].total-100);
      }catch(e){
        console.log(e);
      }
    }
    getIncome();
  },[])


  return (
    <>
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Revenue</span>
        <div className="featuredMoneyContainer">
            {/* <span className='featuredMoney'>{`$`} {income[1]?.total}</span> */}
            <span className='featuredMoneyRate'>
            {Math.floor(perc)}%{" "}
            {perc<0 ? (
            <ArrowDownward className='featuredIcon negative'/> 
            ):<ArrowUpward className='featuredIcon'/> }</span>
        </div>
        <span className="featuredSub">Compared to last Month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Sales</span>
        <div className="featuredMoneyContainer">
            <span className='featuredMoney'>$ 2,410</span>
            <span className='featuredMoneyRate'>-$ 2.5<ArrowDownward className='featuredIcon negative'/> </span>
        </div>
        <span className="featuredSub">Compared to last Month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Cost</span>
        <div className="featuredMoneyContainer">
            <span className='featuredMoney'>$ 2,410</span>
            <span className='featuredMoneyRate'>+ $2.46 <ArrowUpward className='featuredIcon'/> </span>
        </div>
        <span className="featuredSub">Compared to last Month</span>
      </div>
    </div>
    </>
  )
}

export default FeaturedInfo
