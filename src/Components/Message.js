import React, { Component } from "react";

class Message extends Component {
  render() {
    return( 
    <div className="message">
      <div className="name">{this.props.username}</div>
      <div className="text">{this.props.text}</div>
    </div>
   )
  }
}

export default Message;
