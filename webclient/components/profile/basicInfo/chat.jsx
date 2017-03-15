import React from 'react';
import ChatCard from './chatcard';

class Chat extends React.Component {
  constructor() {
    super();
  }

  render() {
    /* eslint-disable */
    let data = this.props.chat.map(function(item){
    /* eslint-enable */
      return (
        <ChatCard data = {item}/>
      );
    });
    return (
      <div>
        {data}
      </div>
    );
  }
}

module.exports = Chat;
