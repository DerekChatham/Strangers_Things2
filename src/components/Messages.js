import React, { useState, useEffect } from "react";
import { callAPI } from "../api";

const Messages = ({ token, userData }) => {
  const [myMessages, setMessages] = useState([]);

  useEffect(async () => {
    try {
      const userMessages = userData.messages;
      setMessages(userMessages);
      
      return;
    } catch (error) {
      console.log("error getting messages", error);
    }
  }, []);

  return (
    <section className="messages">
      <h2>Messages</h2>
      <div className="container">
        {myMessages.map((message) => {
          <div className="messageLog" key={message._id}>
            <h3> {message.fromUser.username}</h3>
          </div>;
        })}
      </div>
    </section>
  );
};

export default Messages;