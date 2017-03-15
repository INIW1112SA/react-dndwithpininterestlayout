import React from 'react';

class ChatCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      /* eslint-disable */
      <div className = "chatcard">
        {this.props.data.message}
      </div>
      /* eslint-enable */
    );
  }
}

module.exports = ChatCard;
