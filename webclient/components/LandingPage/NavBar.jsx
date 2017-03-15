import React, {Component} from 'react';
import {
    Header,
    Container,
    Menu,
    Grid,
    Image,
    Button,
    Dropdown,
    Dimmer,
    Popup,
    Form
} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
// const logger = require('./../../applogger');
import Textarea from 'react-textarea-autosize';
import {Route, Router, hashHistory} from 'react-router';
let Cards = require('./Home');
let Invite = require('./../Invite');
let Profile = require('./../profile/NavBarpro');
let Questions = require('./../answerbutton/questions.jsx');
let Answerpage = require('./../cardAnswerPage/answerPage.jsx');
let Search = require('./../search/search.jsx');

let style = {
    height: 0
};
let Style = {
    marginTop: '5px',
    marginBottom: '5px'
};

class NavBar extends Component {
    state = {
        visible: false,
        open: false,
        heading: '',
        statement: '',
        Concept: '',
        suggestedQuestions: [],
        allQuestionIntentArr: [],
        questionIntent: '',
        selectedConcepts: [],
        searchQuery: ''
    }

    componentWillMount() {
        style = {
            height: $(window).height()
        };
    }

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    toggleSideBar() {
        if (this.state.visible) {
            this.setState({
                visible: !this.state.visible
            });
        }
    }

    callAlert() {
      /*eslint-disable*/
      alert('please login or signup to con');
      /*eslint-enable*/
    }

    handlePostQuestionClick() {
      /*eslint-disable*/
      let context = this;
      /*eslint-enable*/
        if(Cookie.load('email')) {
          this.setState({active: true});
          $.ajax({
            url: 'http://localhost:8080/list/getQuestionIntent/',
            type: 'GET',
            success: function(res) {
                context.setState({allQuestionIntentArr: res});
            },
            error: function() {
            }
        });
        }
        else {
          this.callAlert();
        }
    }

    handleDimmerClose() {
        this.setState({active: false});
    }

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
        if (this.state.visible) {
            this.toggleVisibility();
        }
    }

    updateHeading(evt) {
      // gets the particular heading and gets the intent from that heading
      this.setState({heading: evt.target.value});
      let question = evt.target.value.toLowerCase();
      let allQuestionIntents = this.state.allQuestionIntentArr;
      for(let i in allQuestionIntents) {
        if(i !== null) {
          allQuestionIntents[i].toLowerCase();
          if(allQuestionIntents[i].includes(question)) {
            this.setState({questionIntent: allQuestionIntents[i]});
            break;
          }
          else {
            continue;
          }
        }
      }
    }
    updateStatement(evt) {
      // gets the statement and changes the state
        this.setState({statement: evt.target.value});
    }

    updateConcept(evt) {
        let arr = [];
        this.setState({Concept: evt.target.value});
        // ajax call to get the concepts from the neo4j based on particular keywoard
        $.ajax({
            url: 'http://localhost:8080/list/getconcepts/',
            type: 'POST',
            data: {
              q: evt.target.value
            },
            success: function(data) {
               for(let i in data) {
                 if(i !== null) {
                    arr.push({key: data[i], value: data[i], text: data[i]});
                 }
               }
               this.setState({
                 suggestedQuestions: arr
               });
            }.bind(this),
           error: function() {
           }
      });
    }

    updateQuestionTags(evt, result) {
      // gets the all question tags and stores in an array
      this.setState({selectedConcepts: result.value});
    }

    updatesearchQuery(evt, result) {
      let res = result.value.toString();
      this.setState({
        searchQuery: res
      });
    }

    submitStatement() {
        // ajax call after submitting the values which needed to be asked
        let conceptArr = {};
        conceptArr = JSON.stringify(this.state.selectedConcepts);
        // console.log("Inside submit statement question intent is " + this.state.questionIntent);
        let data = {
            email: Cookie.load('username'),
            profilepicture: Cookie.load('profilepicture'),
            heading: this.state.heading,
            statement: this.state.statement,
            Concept: conceptArr,
            intent: this.state.questionIntent
        };
        $.ajax({
            url: 'http://localhost:8080/list/addquestion',
            type: 'POST',
            data: data,
            success: function() {
                /*eslint-disable*/
                alert('Question posted successfully');
                /*eslint-enable*/
                this.setState({active: false});
            }.bind(this),
            error: function() {

            }
        });
    }

    togetherJS() {
        const script = document.createElement('script');
        script.src = 'https://togetherjs.com/togetherjs-min.js';
        document.body.appendChild(script);
        // TogetherJS(this);
    }

    logoutCall() {
        $.ajax({
            url: 'http://localhost:8080/users/logout', type: 'GET',
            // datatype: 'JSON',
            // data:{username :this.state.username,password:this.state.password},
            success: function(res) {
                if (typeof res.redirect === 'string') {
                    window.location.replace(window.location.protocol
                      + '//' + window.location.host + res.redirect);
                }
                // logger.debug(res.responseText);
                // browserHistory.push('/');
            },
            error: function() {
                // alert("error occurred while logging out");
                // logger.debug(err.responseText);
            }
        });
    }

    render() {
        // const {visible} = this.state;
        const {activeItem} = this.state;
        const {active} = this.state;
        // const backImage = {
        //     image: Cookie.load('profilepicture')
        // };
        if(!Cookie.load('email')) {
          Answerpage = require('./../error.jsx');
          Invite = require('./../error.jsx');
          Questions = require('./../error.jsx');
          Profile = require('./../error.jsx');
        }
        // const {open, dimmer} = this.state;
        return (
            <div style={style}>
                <Menu secondary id='divStyle'>
                    <Grid>
                      <Grid.Column width={2}>

                         <Link to='/home'>
                             <Image src='./../../image/logo.png'
                             name='image' active= {activeItem === 'image'}
                             onClick={this.handleItemClick} className='logosize'/>
                         </Link>
                     </Grid.Column>
                     <Grid.Column width={11}>
                            <Dropdown className = "navSearch" placeholder='Search...'
                              onChange = {this.updatesearchQuery.bind(this)}
                              onKeyUp={this.updateConcept.bind(this)}
                              multiple search selection
                              options={this.state.suggestedQuestions} />
                            <Link to = {'/search?question=' + this.state.searchQuery}>
                            <Button>Search</Button>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Dimmer active={active}
                               onClickOutside={this.handleDimmerClose.bind(this)} page>
                                <Header as='h2' icon>
                                    <Header.Subheader>
                                        <Container>
                                            <Form>
                                                <Form.Field>
                                                  <h2 style={{
                                                      marginBottom: 48 + 'px',
                                                      fontSize: 30 + 'px',
                                                      color: 'white'
                                                  }}>
                                                      ASK QUESTION </h2>
                                                </Form.Field>
                                                <Form.Field>
                                                  <Textarea
                                                     onChange={this.updateHeading.bind(this)}
                                                     rows='1'
                                                     placeholder='Enter Description here...'
                                                        style={{width: 700 + 'px'}}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                  <Textarea
                                                     onChange={this.updateStatement.bind(this)}
                                                     size='large'
                                                      placeholder='Enter statement here ...'
                                                     style={{ width: 700 + 'px',
                                                        height: 150 + 'px'}}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                  <Dropdown placeholder='Enter concepte...'
                                                    onChange = {this.updateQuestionTags.bind(this)}
                                                    onKeyUp={this.updateConcept.bind(this)}
                                                    multiple search selection
                                                    options={this.state.suggestedQuestions} />
                                                </Form.Field>
                                                <Form.Field>
                                                  <div>
                                                    <Button primary size='large' type='submit'
                                                      value='Submit'
                                                      onClick={this.submitStatement.bind(this)}
                                                      style={{width: 200 + 'px'}}>
                                                      Submit Question</Button>
                                                   </div>
                                                </Form.Field>
                                            </Form>
                                        </Container>
                                    </Header.Subheader>
                                </Header>
                            </Dimmer>
                            <Menu.Menu position='right' style={Style} id='divStyle'>
                                <Menu.Item name='PostQuestion'
                                  active={activeItem === 'PostQuestion'}
                                   id='divStyle' onClick={this.handlePostQuestionClick.bind(this)}/>
                                   <Link to='/answer'>
                                         <Menu.Item name='Answer' active={activeItem === 'Answer'}
                                       id='divStyle' onClick={this.handleItemClick}/>
                                     </Link>
                                <Menu.Item name='chat' active={activeItem === 'chat'}
                                   id='divStyle' onClick={this.togetherJS.bind(this)}/>
                                <Link to='/invite'>
                                    <Menu.Item name='invite' active={activeItem === 'invite'}
                                       id='divStyle' onClick={this.handleItemClick}/>
                                </Link>
                                <Link to='/profile'>
                                    <Menu.Item name='Profile' active={activeItem === 'Profile'}
                                       id='divStyle' onClick={this.handleItemClick}/>
                                </Link>
                                <Popup wide trigger={< Button icon='user' id='divStyle'
                                  />} on='click' position='bottom left'
                                  hideOnScroll>
                                  <div>
                                   <Grid >
                                     <Grid.Column width={5}>
                                       <Image src={Cookie.load('profilepicture')}
                                       className='profileImageSize' alt='img'/>
                                     </Grid.Column>
                                     <Grid.Column >
                                       <p className='profileColor'>
                                           {Cookie.load('username')}</p>
                                           <div>
                                           <Link to='/logout'>
                                               <Menu.Item name='Logout'
                                                 active={activeItem === 'Logout'}
                                                  onClick={this.handleItemClick}/>
                                           </Link>
                                           </div>
                                     </Grid.Column>
                                   </Grid>
                                 </div>
                                 </Popup>
                            </Menu.Menu>
                        </Grid.Column>
                    </Grid>
                </Menu>
                <Grid>
                     <Grid.Column width={2}/>
                     <Grid.Column width={13}>
                         <Router history={hashHistory}>
                             <Route path='/home' component={Cards} />
                             <Route path='/invite' component={Invite} />
                             <Route path='/answer' component={Questions} />
                             <Route path='/answerPage' component={Answerpage} />
                             <Route path='/profile' component={Profile} />
                             <Route path='/search' component={Search} />
                         </Router>
                     </Grid.Column>
                     <Grid.Column width={1}/>
                 </Grid>
            </div>
        );
    }
}

module.exports = NavBar;
