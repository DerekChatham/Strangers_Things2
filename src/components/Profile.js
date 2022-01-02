import React, { useState } from 'react';
import { callApi } from '../api';


const Profile = ({ token, userData }) => {
  const [myMessages, setMyMessages] = useState([]);
  const [open, setOpen] = useState(false);

  const API_URL = `/users/me`;

  const getMessages = async (event) => {
    event.preventDefault();
    setOpen(!open);
    try {
      const data = await callApi({
        url: API_URL,
        token,
      });
      const messageArr = data.data.messages;
      setMyMessages(messageArr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div>
        <h2>Hello {userData.username}!</h2>
        <button onClick={getMessages} aria-controls='example-collapse-text' aria-expanded={open}>
          Get Messages
        </button>
        {myMessages.map((message) => (
          <div key={message._id} style={{ minHeight: '150px' }}>
                <h3>From: {message.fromUser.username}</h3>
                <h4>Post: {message.post.title}</h4>
                <p>"{message.content}"</p>
              </div>
            ))}
      </div>
    </>
  );
};
    
      
              
           
          
       

export default Profile;