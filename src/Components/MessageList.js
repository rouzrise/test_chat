import React, { Component } from "react";
import Message from './Message';
import uuid from "uuid";

class MessageList extends Component {

  renderMessages() {
    const messages = this.props.messages

    return messages.map( message => {
      return (
        <div className="message">
        <div className="text">{message}</div>
        <div className="name">{props.name}</div>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="message-list">
      {this.renderMessages}
      {/* {this.props.messages.map(message => {
        return (
          <Message text={message} name={this.props.name}/>
        )
      })} */}
      </div>
    );
  }
}

export default MessageList;
