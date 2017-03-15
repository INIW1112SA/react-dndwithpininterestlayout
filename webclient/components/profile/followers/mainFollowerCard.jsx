import React from 'react';
import { Button, Card, Image} from 'semantic-ui-react';

let headerStyle = {
  marginLeft: '30%',
  fontSize: '30px',
  fontFamily: 'Serif'
};
let descStyle = {
  marginLeft: '20%',
  marginTop: '2%',
  lineHeight: '20px',
  fontSize: '15px',
  letterSpacing: '2px'
};
let cardStyle = {
  width: '100%'

};
class mainFollowerCard extends React.Component {
  constructor() {
      super();
    }
    render() {
        return (
          <Card raised='true' style={cardStyle}>
            <Card.Content>
              <Image floated='left' size='small'
                src={this.props.image}/><br/>
              <Card.Header style={headerStyle}>
                {this.props.heading}
              </Card.Header>
              <Card.Meta style = {{marginLeft: '35%'}}>
                From {this.props.city}
              </Card.Meta>
              <div style={descStyle}>
                <strong> {this.props.description} </strong>
              </div>
            </Card.Content>
              <Card.Content extra>
                <Button style = {{marginLeft: '30%'}} className='butstyle' content='Following'
                                               icon='fork' label={{
                                                 basic: true,
                                                 color: 'white',
                                                 pointing: 'left',
                                                 content: this.props.followingCount
                                             }}/>
                <Button content='Followers' className='butstyle'
                                               icon='fork' label={{
                                                 basic: true,
                                                 color: 'white',
                                                 pointing: 'left',
                                                 content: this.props.followerCount
                                             }}/>
              </Card.Content>

              </Card>
);
}
}
mainFollowerCard.propTypes = {
  image: React.PropTypes.string,
  heading: React.PropTypes.string,
  city: React.PropTypes.string,
  description: React.PropTypes.string,
  followingCount: React.PropTypes.number,
  followerCount: React.PropTypes.number
  };
module.exports = mainFollowerCard;
