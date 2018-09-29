import React, { Component } from "react";
const Message = props => {
  return (
    <div className="message">
      <div className="text">{props.text}</div>
      <div className="name">{props.name}</div>
    </div>
  );
};

export default Message;
