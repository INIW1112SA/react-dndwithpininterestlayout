import React from 'react';
import Cookie from 'react-cookie';
import FollowingCard from './followingcard';

import {
   Dimmer,
   Loader
} from 'semantic-ui-react';
class displayFollowing extends React.Component {

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })
   constructor() {
       super();
       this.state = {
         followingObj: []
       };
     }

     componentWillMount() {
          this.handleOpen();
          this.getFollowing();
     }
     getFollowing() {
       let email = Cookie.load('email');
       // console.log(email);
         $.ajax({
             url: 'http://localhost:8080/userdoc/getFollowing',
             type: 'POST',
             data: {email: email},
             success: function(data) {
               this.handleClose();
               // console.log(data[0].heading);
               // console.log(data.length);
                 this.setState({followingObj: data});
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
         <Loader>Loading</Loader>
       </Dimmer>
         <FollowingCard followingData={this.state.followingObj}/>
       </div>
     );
   }
}
module.exports = displayFollowing;
