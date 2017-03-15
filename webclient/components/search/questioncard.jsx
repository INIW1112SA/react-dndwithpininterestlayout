import React from 'react';
import {Icon, Image, Card, Button} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
class QuestionCard extends React.Component {
    constructor() {
        super();
        this.state = {
            check1: true,
            check2: false,
            iconName: 'save',
            text: 'save'
        };
    }
    /* To save the card which you follow in mongo db & Neo4j*/
      saveToProfile() {
        let emailId = Cookie.load('email');
            $.ajax({
                url: '/users/saveToProfile',
                type: 'PUT',
                data: {
                  emailId: emailId,
                  id: this.props.id,
                  displayImage: this.props.displayImage,
                  heading: this.props.heading,
                  statement: this.props.question,
                  postedBy: this.props.postedBy,
                  profileImage: this.props.profileImage,
                  addedOn: this.props.addedOn,
                  category: this.props.category,
                  upVotes: this.props.upVotes,
                  downVotes: this.props.downVotes,
                  noofans: this.props.answerCounts
                },
                success: function() {
                    this.setState({iconName: 'add', text: 'saved'});
                }.bind(this),
                error: function() {
                }
            });
        }

    render() {
        return (
            <div id='qw'>
              <Card raised='true' className='item' onClick={this.handleChange}>
                  <Link to = {'/answerPage?id=' + this.props.id}>
                    <Image src={this.props.displayImage} className="imgsize"/>
                    <Card.Header id='textheader' className='spacing'>
                        <b>{this.props.heading}</b>
                    </Card.Header>
                    <div id='textsize' className='spacing'>
                        {this.props.question}
                    </div>
                    <div className='spacing'>
                        <Image className="border" floated='left' size='mini'
                          src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                        <Card.Meta>Posted by
                            <a href='' className='clr'>{this.props.postedBy}</a>
                        </Card.Meta>
                        <Card.Meta>On {this.props.addedOn}</Card.Meta>
                        <div>
                            <Card.Meta>Under
                                <a href='' className='clr'>{this.props.category}</a>
                            </Card.Meta>
                        </div>
                    </div>
                  </Link>
                    <div className='spacing'>
                        <Icon name='like outline' color='green' id='space'/>{this.props.upVotes}
                        <Icon name='dislike outline' color='red' className='space1'/>
                        {this.props.downVotes}
                        <Icon name='eye' color='black' size='large' className="viewIcon"/>
                        <b>{this.props.views}  Views</b>
                        <Button onClick={this.saveToProfile.bind(this)} className ='BtnClr'>
                          <Icon name={this.state.iconName} className="margin" size='tiny'
                           style={{'font-size': 20 + 'px'}}/>{this.state.text}
                         </Button>
                    </div>
                    <Link to = {'/anspage?id=' + this.props.id}>
                        <div id="footer" className='spacing'>
                        <Icon name='write square' size='large'/>
                        <b>{this.props.answerCounts}  Answers</b>
                        <Icon name='checkmark box' color='green' size='large'
                          className="checkmark"/>
                        <b>{this.props.acceptedCounts}  Accepted</b>
                      </div>
                    </Link>
                </Card>
            </div>
        );
    }
}
QuestionCard.propTypes = {
   displayImage: React.PropTypes.string.isRequired,
   heading: React.PropTypes.string.isRequired,
   question: React.PropTypes.string.isRequired,
   postedBy: React.PropTypes.string.isRequired,
   addedOn: React.PropTypes.number.isRequired,
   category: React.PropTypes.string.isRequired,
   upVotes: React.PropTypes.string.isRequired,
   downVotes: React.PropTypes.string.isRequired,
   answerCounts: React.PropTypes.string.isRequired,
   profileImage: React.PropTypes.string.isRequired,
   views: React.PropTypes.number.isRequired,
   acceptedCounts: React.PropTypes.string.isRequired,
   remove: React.PropTypes.func.isRequired,
   id: React.PropTypes.number
 };

module.exports = QuestionCard;
