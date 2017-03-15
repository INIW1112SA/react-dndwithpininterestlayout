import React from 'react';
import Cookie from 'react-cookie';
import FollowerCard from './followercard';

import {
   Dimmer,
   Loader
} from 'semantic-ui-react';
class displayFollower extends React.Component {

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })
   constructor() {
       super();
       this.state = {
         followerObj: []
       };
     }

     componentWillMount() {
          this.handleOpen();
          this.getFollower();
     }
     getFollower() {
       let email = Cookie.load('email');
       // console.log(email);
         $.ajax({
             url: 'http://localhost:8080/userdoc/getFollowers',
             type: 'POST',
             data: {email: email, skip: 0, limit: 10},
             success: function(data) {
               this.handleClose();
               // console.log(data[0].header);
               // console.log(data.length);
                 this.setState({followerObj: data});
             }.bind(this),
             error: function() {
              // console.log('error in logout' + err);
             }
         });
     }
   render() {
     const { active } = this.state;
       return (
         <div>
         <Dimmer active={active} page>
         <Loader>Your Followers on the way..</Loader>
       </Dimmer>
         <FollowerCard followerData={this.state.followerObj}/>
       </div>
     );
   }
}
module.exports = displayFollower;
