import React from "react";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

const Transactions=()=>{
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get("/orders");
                const reversedData = res.data.reverse();
                setOrders(reversedData);
            } catch (e) {
                console.log(e);
            }
        }
        getOrders();
    }, []);

    const TimeAgo = ({ timestamp }) => {
        const timeAgo = formatDistanceToNow(new Date(timestamp));
        return <span>{timeAgo} ago</span>;
    }

    const Button = ({ type }) => {
        return <button className={'widgetLgButton ' + type}>{type}</button>
    }

    return(
        <div className='widgetLg' style={{minWidth:1175}}>
            <h3 className="widgetLgTitle">Transcations</h3>
            <table className='widgetLgTable'>
                <tr className='widgetLgTr'>
                    <th className='widgetLgTh'>OrderId</th>
                    <th className='widgetLgTh'>Username</th>
                    <th className='widgetLgTh'>Date</th>
                    <th className='widgetLgTh'>Amount</th>
                    <th className='widgetLgTh'>Status</th>
                </tr>
                {orders.map((order) => (
                    <tr className='widgetLgTr' key={order._id}>
                        <td className='widgetLgorder'>
                            <span >{order._id}</span>
                        </td>
                        <td className='widgetLgUser'>
                            <span className="widgetLgName">{order.userId}</span>
                        </td>
                        <td className="widgetLgDate">
                            <TimeAgo timestamp={new Date(order.createdAt)} />
                        </td>
                        <td className="widgetLgAmount">₹{order.amount}</td>
                        <td className="widgetLgStatus"><Button type={order.status} /></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Transactions;