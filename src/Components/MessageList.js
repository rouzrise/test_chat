import React, { Component } from "react";
import uuid from 'uuid';

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
      {this.props.messages.map((message) => {
          return (
              <div key={message.id}>
                   <div>{message.senderId}</div>
              <div>{message.text}</div>
              </div>
          )
      })}
 
      </div>
    );
  }
}

export default MessageList;
