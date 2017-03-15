import React from 'react';
import PeopleCard from './peoplecard';

class People extends React.Component {
  constructor() {
    super();
  }

  render() {
    /* eslint-disable */
    let context = this;
    let allPeople = this.props.people.map(function(item) {
    /* eslint-enable */
      let temp = false;
      context.props.isfollow.map(function(item2) {
        if(item2.emailId === item) {
          temp = item2.follow;
        }
      });
      return (
        <PeopleCard id = {item} follow = {temp}/>
      );
    });
    return (
      <div>
        {allPeople}
      </div>
    );
  }
}

module.exports = People;
