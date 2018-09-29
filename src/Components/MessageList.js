import React, { Component } from "react";
import Message from './Message';
import uuid from "uuid";

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
      {/* {this.props.messages.map(message => {
        return (
          <Message text={message}/>
        )
      })} */}
    
          <Message text={this.props.messages[0]}/>
      </div>
    );
  }
}

export default MessageList;
