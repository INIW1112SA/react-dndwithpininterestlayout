import React from 'react';
import {
    Grid,
    Card,
    Icon,
    Menu
} from 'semantic-ui-react';
let ansStyle = {
  marginLeft: '5%'
};
let cardStyle = {
  width: '60%'
};

let commentStyle = {
    fontFamily: 'Cochin',
    fontSize: 18
};
class mainAnswerCard extends React.Component {

   constructor() {
       super();
     }

   render() {
       return (
         <div style ={ansStyle}>
             <Grid divided='vertically'>
                 <Grid.Row columns={3}>
                     <Grid.Column width={2}/>
                     <Grid.Column width={10}>
                         <div>
                             <Card fluid style={cardStyle}>
                                 <Card.Content>
                                     <Card.Header>
                                        {this.props.answer}
                                     </Card.Header>
                                 </Card.Content>
                                 <Menu style={commentStyle}>
                                     <Menu.Item>
                                         <Icon name='thumbs up' size='large' color='green'/>
                                         {this.props.upVote}
                                     </Menu.Item>
                                     <Menu.Item>
                                         <Icon name='thumbs down' size='large' color='red'/>
                                         {this.props.downVote}
                                     </Menu.Item>
                                     <Menu.Item>
                                         <Icon name='checkmark' size='large' color='green'/>
                                         Added On: {this.props.addedOn}
                                     </Menu.Item>

                                 </Menu>
                             </Card>
                         </div>
                     </Grid.Column>

                 </Grid.Row>
             </Grid>
           </div>
       );
   }
}
module.exports = mainAnswerCard;
mainAnswerCard.propTypes = {
  answer: React.PropTypes.string,
  upVote: React.PropTypes.number,
  downVote: React.PropTypes.number,
  addedOn: React.PropTypes.string
};
