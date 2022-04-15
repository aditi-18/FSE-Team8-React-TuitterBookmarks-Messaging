import React from "react";
import Conversation from "../conversation/conversation";
import Message from "../message/message";
import {useEffect, useState, useRef} from "react";
import "./messages.css"
import * as service1 from "../../services/message-service"
import * as service2 from "../../services/security-service"
import {io} from "socket.io-client"

const Messages = () => {
  const [user, setUser] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef()


  useEffect(async () =>{
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        from: data.fromId,
        message: data.message,
        createdAt: Date.now(),
      });
    })
}, []);

useEffect(() => {
  arrivalMessage && currentChat?.members.includes(arrivalMessage.from) &&
  setMessages(prev =>[...prev, arrivalMessage])
}, [arrivalMessage, currentChat])

    useEffect(async () =>{
      if(user && user._id){
      socket.current.emit("addUser", user._id);}
      socket.current.on("getUsers", users=>{
        console.log(users)
      })
  }, [user]);

console.log(socket)

     useEffect(async () =>{
          try{
            const userdemo =  await service2.profile();
            setUser(userdemo);

          }catch(err){
            console.log(err)
          }

      }, []);


      useEffect(async ()=>{
        if(user && user._id){
          try{
             console.log(user._id)
             const res = await service1.findConversationOfUser(user._id)
             setConversations(res.data)

           }
         catch(err){
           console.log(err);
         }

        }
      }, [user])

      useEffect(async () =>{
        try{
          const res =  await service1.findMessageFromConversation(currentChat?._id)
          setMessages(res.data)
        }catch(err){
          console.log(err)
        }

    }, [currentChat]);

    const handleSubmit = async(e) => {
      e.preventDefault();
      const message = {
        conversationId: currentChat?._id,
        message: newMessage,
      };

      const toId = currentChat.members.find(member => member !== user?._id)

      socket.current.emit("sendMessage", {
        fromId: user._id,
        toId,
        message: newMessage,
      })

      try{
        const res = await service1.userMessagesAnotherUser(user?._id,message);
        setMessages([...messages, res])
        setNewMessage("");
      }catch(err){
        console.log(err)
      }
    }

    useEffect(async () =>{
      scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages]);

  return(
    <div classname = "messages">
      {/* <h1>Messages Screen</h1> */}
      <div className="chatMenu"></div>
          <div className= "chatMenuWrapper">
            {/* <input placeholder= "Search for friends" className="chatMenuInput" /> */}

            {/* <textarea className ="chatConvoInput" placeholder="Enter username to chat.."
              onChange = {(e) => setNewMessage(e.target.value)}
              value={newMessage}></textarea>
              <button className= "chatConvoButton" >Start</button> */}
            {conversations.map((c) => (
              <div onClick={()=>setCurrentChat(c)}>
                <Conversation conversation ={c} currentUser={user}/>
                </div>

            ))}
          </div>
      <div className="chatBox"></div>
          <div className= "chatBoxWrapper">
            {
              currentChat ? (
              <>

            <div className="chatBoxTop">
              {messages.map(m=>(
                <div ref = {scrollRef}>
                <Message message ={m}  own ={m.from === user._id}/>
                </div>
              ))}

              </div>
            <div className="chatBoxBottom">
              <textarea className ="chatMessageInput" placeholder="Write something..."
              onChange = {(e) => setNewMessage(e.target.value)}
              value={newMessage}>
              </textarea>
              <button className= "chatSubmitButton" onClick={handleSubmit}>Send</button>
            </div></> ):( <span className = "noConversationText">Open a conversation to start a chat.</span>)}
          </div>
       </div>
  );
};
export default Messages;