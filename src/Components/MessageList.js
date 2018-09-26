import React, { Component } from "react";
import Message from './Message';
import uuid from "uuid";

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          return (
           <Message key={index} username={message.senderId} text={message.text}/>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
