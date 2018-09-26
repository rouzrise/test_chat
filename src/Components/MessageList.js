import React, { Component } from "react";

const fakeData = [
  {
    senderId: "Anna",
    text: "Hello"
  },
  {
    senderId: "Igor",
    text: "Hi"
  },
  {
    senderId: "Anna",
    text: "How are you?"
  },
  {
    senderId: "Igor",
    text: "I am ok"
  }
];

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
      {fakeData.map((message, index) => {
          return (
              <div>
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
