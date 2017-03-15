import React from 'react';
import {
    Icon,
    Image,
    Card,
    Button,
    Segment,
    Popup
} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
import Modal from './inviteModal';
class DisplayFavouriteCategoryStructure extends React.Component {
    constructor() {
        super();
        this.state = {
          check1: true,
          check2: false,
          iconName: 'save',
          text: 'save',
          emailId: '',
          Qid: '',
          userNames: [],
          name: '',
          s: ''
    };
      this.state = { isModalOpen: false };
    }
    handleShow = () => this.setState({active: true})
    handleHide = () => this.setState({active: false})
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
            error: function() {}
        });
    }
    openModal() {
      this.setState({ isModalOpen: true });
      this.getusers();
    }
    getusers()
    {
      $.ajax({
          url: '/users/getAllUserName',
          type: 'get',
          success: function(data) {
            // console.log(JSON.stringify(data));
              this.setState({userNames: data});
          }.bind(this),
          error: function() {}
      });
    }
    sendInvite(mail)
    {
      let sender = Cookie.load('email');
      let uMail = mail;
      // console.log(uMail);
      // console.log(this.props.id);
      $.ajax({
          url: '/followinvite/sendInviteEmail',
          type: 'post',
          data: {

            id: this.props.id,
            type: 'Google',
            emailId: uMail,
              sender: sender

          },
          success: function() {
              // this.setState({iconName: 'add', text: 'saved'});
              this.setState({inviteName: 'Invited', inviteColor: 'red'});
              // console.log("mail sent");
          }.bind(this),
          error: function() {}
      });
    }
    closeModal() {
      this.setState({ isModalOpen: false });
    }
    /* fetching the textbox value Createdon 10/3/2017 by Soundar*/
    changeval(e)
    {
      this.setState({s: e.target.value});
      this.findAllUsers(this.state.s);
    }
    /* fetching all usernames and emailid from mongo DB Createdon 10/3/2017 by Soundar*/
    findAllUsers(s)
{
  let userNames = this.state.userNames;
//  let loginUser = Cookie.load('username');
  let loginEmail = Cookie.load('email');
//  // console.log(loginUser);
let b = s.toLowerCase();
// console.log(b);
let option = '';
for(let i = 0; i < userNames.length; i = i + 1)
{
  // console.log(userNames[i].name);
if(userNames[i].name.toLowerCase().indexOf(b) === 0 && userNames[i].email !== loginEmail)
{
option = option + '<option value= "' + userNames[i].name + '"/>';
}
}
document.getElementById('usernames').innerHTML = option;
// React.render(<ReactDatalist list="countries" options={option} />, document.body)
option = '';
this.setState({s: ''});
}
/* fetch the mailId of the particular user selected in textbox Createdon 10/3/2017 by Soundar**/
findMail()
{
  let mail = '';
  let loginEmail = Cookie.load('email');
let uname = document.getElementById('users');
// let uname = '';
  let userNames = this.state.userNames;
  // console.log(userNames.length);
  for(let i = 0; i < userNames.length; i = i + 1)
  {
  if(userNames[i].name === uname.value && userNames[i].email !== loginEmail)
  {
  mail = userNames[i].email;
  break;
  }
  }
  // console.log(mail);
  this.sendInvite(mail);
}


    render() {
        const {active} = this.state;
        const content = (
          <div><Button circular onClick={this.saveToProfile.bind(this)}
          icon='plus' className='spacing' id='iconColor' size='tiny' style={{
            'font-size': 13 + 'px'
        }}/>
        <Button circular onClick={() => this.openModal()}
          icon='google plus circle' id='iconColor'
          size='tiny' style={{'font-size': 13 + 'px'}}/>
        </div>
);
const heading = {
  color: 'white',
  float: 'left'
};
const hDiv = {
  background: 'teal'
};
const Question = {
  color: 'teal'
};
const input = {
   align: 'center'
};

    /*eslint-disable*/    return (
            <div className='CardSegment'>
                <Card raised='true' className='item' onClick={this.handleChange}>
                  <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                    <p style={hDiv}>
                    <h1 style={heading}>Invite  Friends  to  follow</h1>
                  <Button circular onClick={() => this.closeModal()} color='teal' icon='remove'/>
                  </p>
                    <h2 style={Question}>Question:<br/>{this.props.heading}</h2>
                    <div style={input}>
                    <input id="users" list="usernames" onKeyDown={this.changeval.bind(this)}/>
               <datalist id="usernames"></datalist><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/></div>
          <Button fluid onClick={this.findMail.bind(this)} color='teal'>
          Invite
        </Button>

                                    </Modal>

                        <div className="PaddingCards">
                            <Image src={this.props.displayImage} className="imgsize"
                              onMouseEnter={this.handleShow} dimmer={{
                                active,
                                content
                            }} onMouseLeave={this.handleHide}/>
                            </div>
                            <Link to= {'/answerPage?id=' + this.props.id}>
                            <div className="PaddingCards">
                                <Card.Header id='textheader' className='spacing'>
                                    <b>{this.props.heading}</b>
                                </Card.Header>
                            </div>

                    </Link>
                    <div className='spacing' id='PaddingCards1'>
                        <Image className="border" floated='left' size='mini'
                          src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                        <Card.Meta>
                            <a href='' className='LinkColor'>{this.props.postedBy}</a>
                        </Card.Meta>
                        <Card.Meta>
                            {this.props.addedOn}
                        </Card.Meta>
                    </div>
                    <div className="PaddingCardsBottom">
                        <Segment.Group horizontal>
                            <Segment>
                                <Popup trigger={< Icon name = 'like outline' color = 'green' />}
                                 content='Likes' position='bottom left' size='tiny'/>
                                 {this.props.upVotes}
                            </Segment>
                            <Segment>
                                <Popup trigger={< Icon name = 'eye' color = 'black'
                                  size = 'large' />} content='Views'
                                  position='bottom left' size='tiny'/>
                                <b>{this.props.views}
                                </b>
                            </Segment>
                            <Segment>
                                <Popup trigger={< Icon name = 'write square' size = 'large' />}
                                 content='Answers' position='bottom left' size='tiny'/>
                                <b>{this.props.answerCounts}
                                </b>
                            </Segment>
                        </Segment.Group>
                    </div>
                </Card>
            </div>
        );/*eslint-enable*/
    }
}
DisplayFavouriteCategoryStructure.propTypes = {
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
    id: React.PropTypes.number,
    raised: React.PropTypes.bool
};
module.exports = DisplayFavouriteCategoryStructure;
