import React, {Component} from 'react';
import {Button, Image, Grid, Statistic, Segment, Header, Icon} from 'semantic-ui-react';
import Cookie from 'react-cookie';
let DisplayQues = require('./questions/displayQuestions.jsx');
let DisplayAns = require('./answers/displayAnswers.jsx');
let BasicInfo = require('./basicInfo/basicInfo.jsx');
let DisplayFollowing = require('./following/displayFollowing');
let DisplayFollower = require('./followers/displayFollower');
import InterestsCard from './basicInfo/interestedCategories/interestsCard';
let picStyle = {
    marginTop: '3%'
};
let meterStyle = {
    marginTop: '30%',
    marginLeft: '60%',
    color: '#B2242E'
};
let imageStyle = {
  marginLeft: '35%'
};
let nameStyle = {
    marginTop: '1%',
    fontSize: '20px',
    fontWeight: 'bold',
    marginLeft: '40%',
    color: '#B2242E'
};
let buttonStyle = {
  marginLeft: '10%',
  marginTop: '-2%'
};
class NavBarPro extends Component {

    state = {
        activeItem: 'info',
        questionCount: 1,
        answerCount: 0,
        followerCount: 0,
        followingCount: 0,
        foname: 0,
        primary: '',
        secondary: '',
        university: '',
        objArray: [],
        status: 0,
        interestsData: [],
          /*eslint-disable*/
        content: (
          <BasicInfo />
        )
    }

    handleItemClick = (e, {name}) => {
      // console.log('comes');
      let temp = (
        <BasicInfo />
      );
      // console.log('Name:' + name);
      if(name === 'info') {
        temp = (
          <BasicInfo />
        );
      }
      else if(name === 'Questions') {
        temp = (
          <DisplayQues />
        );
      }
      else if(name === 'Answers') {
        temp = (
          <DisplayAns />
        );
      }
      /*eslint-enable*/
      else if(name === 'follower') {
        temp = (
          <DisplayFollower/>
        );
      }
      else if(name === 'following') {
        temp = (
          <DisplayFollowing />
        );
      }
      this.setState({
        activeItem: name,
        content: temp
      });
    }

    getInterestedTopics() {
        $.ajax({
            url: 'http://localhost:8080/userdoc/getInterestedTopics',
            type: 'POST',
            data: {
                email: Cookie.load('email')
            },
            success: function(data) {
                this.setState({interestsData: data,
                content: <InterestsCard interestData={this.state.interestsData}/>
                });
            }.bind(this),
            error: function() {
                // console.error(err.toString());
            }
        });
    }

    onClick() {
        $.ajax({
            url: '/users/logout',
            type: 'GET',
            success: function(data) {
                if (typeof data.redirect === 'string') {
                    window.location.replace(window.location.protocol +
                       '//' + window.location.host + data.redirect);
                }
            },
            error: function() {
                // console.log('error in logout' + err);
            }
        });
    }

    componentWillMount() {
        this.getProfile();
    }

    getProfile() {
      let email = Cookie.load('email');
        $.ajax({
            url: 'http://localhost:8080/userdoc/getuserprofile',
            type: 'POST',
            data: {email: email},
            success: function(data) {
                this.setState({questionCount: data.lists.length,
                   answerCount: data.answers.length,
                    followerCount: data.followerCount,
                     followingCount: data.followingUser.length,
                     objArray: data});
                     if(data.profile.gender.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.education.primary.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.education.highSchool.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.education.university.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.address.country.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.address.city.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.address.region.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.dob.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.phone.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.description.length > 0) {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
            }.bind(this),
            error: function() {
              // console.log('error in logout' + err);
            }
        });
    }

    render() {
        const followerCount = this.state.followerCount;
        const followingCount = this.state.followingCount;
        let profMeter = parseInt(this.state.status, 10) + '%';
        return (
            <div>
              <Segment>
                <Grid centered columns={2}>
                    <Grid.Column style={picStyle}>
                      <Image style={imageStyle} src={Cookie.load('profilepicture')}
                        size='small' shape='circular' avatar bordered/>
                        <div style={nameStyle}>
                            {Cookie.load('username')}
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                      <div style={meterStyle}>
                        <Statistic>
                          <Statistic.Label>Profile Meter</Statistic.Label>
                          <Statistic.Value> {profMeter} </Statistic.Value>
                          <Statistic.Label>completed</Statistic.Label>
                        </Statistic>
                        </div>
                    </Grid.Column>
                  </Grid>
                    <div style = {buttonStyle}>
                       <Button onClick={this.handleItemClick}
                         className='butstyle'
                         content='Followers'
                         icon='user plus' label={{
                           basic: true,
                           color: 'white',
                           pointing: 'left',
                           content: followerCount
                       }}/>
                       <Button onClick={this.handleItemClick} className='butstyle'
                         content='Following'
                         icon='fork' label={{
                           basic: true,
                           color: 'white',
                           pointing: 'left',
                           content: followingCount
                       }}/>
                     </div>
                     </Segment>
                <div>
                    <br/>
                  <Grid>
                    <Grid.Column width = {12}>
                    {this.state.content}
                  </Grid.Column>
                  <Grid.Column width = {4}>
                    <Segment>
                      <Header as='h2' dividing>
 <Header.Content>
   {this.state.answerCount}
   &nbsp;&nbsp;&nbsp;
   Questions
   <Icon name='question circle' />
 </Header.Content>
</Header>

<Header as='h2' dividing>
 <Header.Content>
   {this.state.answerCount}
   &nbsp;&nbsp;&nbsp;Answers
  <Icon name='info circle' />
 </Header.Content>

</Header>
<Header as='h2' dividing>
 <Icon name='favorite' />
 <Header.Content onClick={this.getInterestedTopics.bind(this)}>
   Watching Topics
 </Header.Content>
</Header>
</Segment>
                  </Grid.Column>
                  <Grid.Column width = {1}/>
                </Grid>
              </div>
            </div>
        );
    }
}

module.exports = NavBarPro;
