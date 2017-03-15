import React from 'react';
import {Image, Card, Icon, Menu, Popup, Divider} from 'semantic-ui-react';
let poststyle1 = {
    fontFamily: 'Georgia',
    fontSize: 15,
    fontWeight: 'serif'
};
let ansstyle = {
    fontFamily: 'Cochin',
    fontWeight: 'serif'
};
let addicon = {
    marginLeft: '70%'
};
let commentstyle = {
    fontFamily: 'Cochin',
    fontSize: 18
};
class cardAnswer extends React.Component {
    constructor() {
        super();
    }
    render() {
      return (
        <div>
            <Card fluid>
                <Card.Content style={poststyle1}>
                  <Image floated='left' size='mini'
                    src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                    <a>
                        {this.props.createdBy}
                    </a>
                    <div>Answered on {this.props.createdOn}
                        <Icon name='add user' style={addicon} size='big' color='blue'/></div>
                </Card.Content>
                <Card.Content>
                    <Card.Header style={ansstyle}>
                        {this.props.content}
                    </Card.Header>
                </Card.Content>
                <Menu style={commentstyle}>
                    <Menu.Item>
                        <Icon name='thumbs up' size='large' color='green'/> {this.props.upvote}
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='thumbs down' size='large' color='red'/> {this.props.downvote}
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='checkmark' size='large' color='green'/> {this.props.isAccepted}
                    </Menu.Item>
                    <Menu.Item>Add Comment</Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Popup on='click' trigger={< Icon name = 'ellipsis horizontal'
                              size = 'large' />} hideOnScroll>
                                <Menu vertical>
                                    <Menu.Item>Comments</Menu.Item>
                                    <Menu.Item>Save Answer</Menu.Item>
                                </Menu>

                            </Popup>

                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Card>
            <Divider clearing/>
          </div>
        );
    }
}
cardAnswer.propTypes = {
    createdBy: React.PropTypes.string.isRequired,
    createdOn: React.PropTypes.number.isRequired,
    content: React.PropTypes.string.isRequired,
    upvote: React.PropTypes.string.isRequired,
    downvote: React.PropTypes.string.isRequired,
    isAccepted: React.PropTypes.string.isRequired
};
module.exports = cardAnswer;
