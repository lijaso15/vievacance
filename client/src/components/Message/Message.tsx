import React from "react";
import { MessageProps } from "../../types";

class Message extends React.Component<MessageProps> {
  render() {
    const { viewer, message } = this.props;
    {
      if (viewer) {
        return (
          <div className="column">
            {" "}
            <article className="message is-warning is-small">
              <div className="message-body">
                {message[0]}
                <a href={"/mementos/" + viewer}> click here </a>
                {message[1]}
              </div>
            </article>
          </div>
        );
      } else {
        return (
          <div className="column">
            {" "}
            <article className="message is-warning is-small">
              <div className="message-body">
                {message[0]}
                <a href={"/homeglobe"}> click here </a>
                {message[1]}
              </div>
            </article>
          </div>
        );
      }
    }
  }
}

export default Message;
