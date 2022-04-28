import React from "react";
import Conversation from "../conversation/conversation";
import Message from "../message/message";
import {useEffect, useState, useRef} from "react";
import "./messages.css"
import * as service1 from "../../services/message-service"
import * as service2 from "../../services/security-service"
import service, * as service3 from "../../services/users-service"
import {io} from "socket.io-client"

const Messages = () => {
  const [user, setUser] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [noConversation, setNoConversation] = useState(false)
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
          if(user && user._id || noConversation){
            try{
               console.log(user._id)
               const res = await service1.findConversationOfUser(user._id)
               setConversations(res.data)
               !noConversation && setNoConversation(false)
             }
           catch(err){
             console.log(err);
           }

          }
        }, [user, noConversation])

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

  const handleConvo = async(e) => {
        const u2= await service3.findUserByUsername(user2);
        console.log(u2);
        console.log(u2?._id);
        if(u2){
             e.preventDefault();
             const conversation = {
              uid1:user?._id,
              uid2:u2?._id,
             };
             const res = await service1.findConversationOfBothUsers(user?._id,u2?._id);
             console.log(">>> res : ", res.data.length)
             if(res.data.length == 0){
                 const res = await service1.createConversation(conversation);
                 setNoConversation(true)
             }
             else
             {
                 console.log("Conversation found!!");
             }

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
             <textarea className ="chatConvoInput" placeholder="Enter username to chat.."
              onChange = {(e) => setUser2(e.target.value)}
              value={user2}></textarea>
              <button className= "chatConvoButton" onClick={handleConvo} >Start</button>
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