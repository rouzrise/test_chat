import React, { Component } from "react";

const Message = ({username, text}) => {
    return( 
    <div className="message">
      <div className="name">{username}</div>
      <div className="text">{text}</div>
    </div>
   )

}

export default Message;

