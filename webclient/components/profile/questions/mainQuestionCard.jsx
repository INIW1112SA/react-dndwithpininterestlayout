import React from 'react';

import {
   Grid,
   Card,
   Icon,
   Menu
} from 'semantic-ui-react';
let queStyle = {
  marginLeft: '5%'
};

class mainQuestionCard extends React.Component {

   constructor() {
       super();
     }
   render() {
       return (
         <div style = {queStyle}>
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column width={2}/>
                    <Grid.Column width={10}>
                        <div>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>
                                         {this.props.heading}
                                    </Card.Header>
                                    <Card.Description className='ansWidth'>
                                      {this.props.category}
                                    </Card.Description>
                                </Card.Content>
                                   <Menu>
                                        <Menu.Item>
                                            <Icon name='thumbs up' color='green' size='large'/>
                                            {this.props.upVote}
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Icon name='thumbs down' color='red' size='large'/>
                                            {this.props.downVote}
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Icon name='checkmark' color='green' size='large'/>
                                                {this.props.acceptedCount} Accepted
                                                </Menu.Item>
                                    </Menu>
                               </Card>
                        </div>

                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
            </div>

       );
   }
}
module.exports = mainQuestionCard;
mainQuestionCard.propTypes = {
  heading: React.PropTypes.string,
  category: React.PropTypes.string,
  acceptedCount: React.PropTypes.number,
  upVote: React.PropTypes.number,
  downVote: React.PropTypes.number
};
