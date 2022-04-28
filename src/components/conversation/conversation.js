import React from "react";
import "./conversation.css"
import {useEffect, useState} from "react";
import * as service from "../../services/users-service"
const Conversation = ({conversation, currentUser}) => {
    const [user,setUser] = useState(null)

    useEffect(async() =>{
        const friendId = conversation.members.find((m) => m !== currentUser._id)
        try{
            const res = await service.findUserById(friendId)
            setUser(res)
            console.log(res)
        }catch(err){
            console.log(err);
        }
        
    },[currentUser, conversation]);

  
    return(
        <div className="conversation">
            <img className="messageImg"
                 src = "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt = ""></img>
            <span className="conversationName">
                {user?.username} 
            </span>
        </div>
    )

}
export default Conversation;