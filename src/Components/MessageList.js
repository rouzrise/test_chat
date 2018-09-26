import React, { Component } from "react";
import uuid from 'uuid';

const fakeData = [
  {
    id: uuid.v4(),
    senderId: "Anna",
    text: "Hello"
  },
  {
    id: uuid.v4(),
    senderId: "Igor",
    text: "Hi"
  },
  {
    id: uuid.v4(),
    senderId: "Anna",
    text: "How are you?"
  },
  {
    id: uuid.v4(),
    senderId: "Igor",
    text: "I am ok"
  }
];

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
