import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';
import "./home.css";
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import { userData } from '../../dummyData';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { userRequest } from '../../requestMethods';

function Home() {

  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "OCt",
      "Nov",
      "Dec",
    ],
    []
  )

  useEffect(()=>{
    const getStats=async ()=>{
      try{
        const res=await userRequest.get("/users/stats");
        res.data.map(item=>{
          setUserStats(prev=>[
            ...prev,{name:MONTHS[item._id-1], "Active User":item.total},
          ])
        })
      }catch(e){
        console.log(e);
      }
    }
    getStats();
  },[MONTHS])


  return (
    <>
    <div className='home'>
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
    </>
  )
}

export default Home;
