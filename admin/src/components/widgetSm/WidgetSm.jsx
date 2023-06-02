import React, { useEffect, useState } from 'react'
import "./widgetSm.css";
import { Visibility } from '@material-ui/icons';
import { userRequest } from "../../requestMethods";
import { formatDistanceToNow } from 'date-fns';

function WidgetSm() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                // const res = await userRequest.get("users/?new=true")
                const res = await userRequest.get("users/");
                if (res) {
                    const reversedData = res.data.reverse();
                    setUsers(reversedData);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getUsers();
    }, []);

    const TimeAgo=({ timestamp })=> {
        const timeAgo = formatDistanceToNow(new Date(timestamp));
        return <span>{timeAgo} ago</span>;
      }

    return (
        <div className='widgetSm'>
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.slice(0,5).map((user) => (
                    <>
                        <li className='widgetSmListItem' key={user._id}>
                            <img src={user.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" className="widgetSmImg" />
                            <div className="widgetSmUser">
                                <span className="widgetSmUsername">{user.username}</span>
                            </div>
                            {/* <button className="widgetSmButton">
                                <Visibility className='widgetSmIcon' />
                            </button> */}
                            <span className="widgetSmButton">{`${user.fname} ${user.lname}`}</span>
                        </li>
                    </>
                ))}
            </ul>
        </div>
    )
}

export default WidgetSm;
