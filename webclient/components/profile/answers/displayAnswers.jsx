import React from 'react';
import Cookie from 'react-cookie';
import AnswersCard from './answersCard';
import {
   Dimmer,
   Loader
} from 'semantic-ui-react';
class displayAnswers extends React.Component {

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })
   constructor() {
       super();
       this.state = {
         answerobj: []
       };
     }

     componentWillMount() {
          this.handleOpen();
          this.getAnswers();
     }

     getAnswers() {
       let email = Cookie.load('email');
       // console.log(email);
         $.ajax({
             url: 'http://localhost:8080/userdoc/getAnswers',
             type: 'POST',
             data: {email: email},
             success: function(data) {
               this.handleClose();
               // console.log(data[0].heading);
               // console.log(data.length);
                 this.setState({answerobj: data});
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
          <AnswersCard answerData={this.state.answerobj}/>
        </div>
      );
    }
}
module.exports = displayAnswers;
