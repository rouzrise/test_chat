import React, { Component } from "react";
import placeholder from "./../vectors/placeholder.jpg";
const Message = props => {
  return (
    <div className="message">
      <div className="text">{props.text}</div>
    </div>
  );
};

export default Message;
