// written by Arun Mohan Raj
// importing the required files
import React from 'react';
import {
    Grid,
    Divider,
    Icon,
    Breadcrumb,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import QueCards from './cardsCollection.jsx';
// suggested questions display page
class Questions extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            objArray: []
        };
        this.getQuestions = this.getQuestions.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen() {this.setState({ active: true });}
    handleClose() {this.setState({ active: false });}
//     getInitialState(){
//   return {
//     objArray :[]
//     }
// }
    // function to get questions from database
    getQuestions() {
      // console.log('inside getquestions');
      this.handleOpen();
        $.ajax({
            url: 'http://localhost:8080/list/',
            type: 'GET',
            success: function(data) {
                // console.log(JSON.stringify(data, undefined, 2));
                this.setState({objArray: data});
                this.handleClose();
            }.bind(this),
            error: function() {
                // console.log('error occurred on AJAX');
                // console.log(err);
            }
        });
    }
    // getQuestions function is called as soon as the page renders
    componentDidMount() {
        this.getQuestions();
    }
// display question component
    render() {
        const { active } = this.state;
        return (
          <div>
            <Dimmer active={active} page>
            <Loader>Fetching Questions</Loader>
          </Dimmer>
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column width={2}/>
                    <Grid.Column width={10}>
                        <h1>
                            <Icon name='star' color='red'/>Questions For You
                        </h1>
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Section link>Home</Breadcrumb.Section>
                                <Breadcrumb.Divider icon='right angle'/>
                                <Breadcrumb.Section link>suggested questions</Breadcrumb.Section>
                            </Breadcrumb>
                        </div>
                        <Divider clearing/>
                        <div>
                            <QueCards quesCollection={this.state.objArray}/>
                        </div>
                        </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
          </div>
        );
    }
}
module.exports = Questions;
