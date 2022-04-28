import axios from "axios";

//const BASE_URL = "https://cs5500-ass4.herokuapp.com"
const BASE_URL = "http://localhost:4000";
const USERS_API = `${BASE_URL}/api/users`;

export const api = axios.create({
    withCredentials: true
  });
  
  export const userMessagesAnotherUser = (uid1, message) =>
  api.post(`${USERS_API}/${uid1}/message`,message)
      .then(response => response.data);

export const incomingMessages = (uid1) =>
  api.get(`${USERS_API}/${uid1}/incomingmessages`)
      .then(response => response.data);

export const outgoingMessages = (uid1) =>
      api.get(`${USERS_API}/${uid1}/outgoingmessage`)
          .then(response => response.data);

export const userDeletesAMessage = (uid1, uid2) =>
      api.delete(`${USERS_API}/${uid1}/deletemessage/${uid2}`)
          .then(response => response.data);

export const findConversationOfUser = (uid1) =>
        api.get(`${USERS_API}/conversation/${uid1}`)

export const findMessageFromConversation = (conversationId) =>
        api.get(`${USERS_API}/findMessages/${conversationId}`)

export const deleteConversation = (conversationId) =>
      api.delete(`${USERS_API}/deleteConversation/${conversationId}`)
          .then(response => response.data);

export const userDeletesAMessage = (uid1, conversationId) =>
      api.delete(`${USERS_API}/${uid1}/deletemessage/${conversationId}`)
          .then(response => response.data);