let React = require('react');
let {hashHistory} = require('react-router');
import {Button, Grid, Icon, Form, Segment } from 'semantic-ui-react';
import validator from 'validator';
// import graph from 'fbgraph';
import $ from 'jquery';

class Login extends React.Component {
   constructor() {
       super();
       this.state =
       {
        open: true,
        erroremail: false,
        errormessageemail: '',
        email: '',
        validemail: ''
        };
      this.onSubmitLoginData = this.onSubmitLoginData.bind(this);
   }

    ChangeEmail = (event) => {
        this.setState({email: event.target.value});
        // check whether the user is alreay exists or not
        if(event.target.value.length > 7) {
        if (validator.isEmail(event.target.value)) {
            this.setState({erroremail: false});
            this.setState({validemail: true});
            this.setState({errormessageemail: false});
        } else {
            this.setState({erroremail: true});
            this.setState({validemail: false});
            this.setState({errormessageemail: 'Enter valid email, including the \@\ '});
        }
      }
    }


// LoginUser(){
// $.ajax({
//   url:"http://localhost:8080/users/login",
//   type: 'POST',
//   datatype: 'JSON',
//   data:{
//     'username':this.state.username,
//     'password':this.state.password
//   },
//   success: function(res){
//     console.log(res.responseText);
//     browserHistory.push('/home');
//   },
//   error: function(err){
//     // alert("Invalid username or password");
//     console.log(err.responseText);
//   }
// });
// }
//   inviteFriends()
//   {
//   let wallPost = {
//   message: 'I a;m gonna come at you like a spider monkey, chip!'
// };

// graph.post('Srinivaaas' + "/feed", wallPost, function(err, res) {
  // returns the post id
  // console.log(res);
    onSubmitLoginData(value) {
        // console.log(value.formData);
        $.ajax({
                url: 'http://localhost:8080/users/login',
                type: 'POST',
                data: {
                    email: value.formData.userName,
                    password: value.formData.password
                },
                success: function() {
                    // console.log('gggggggggggggg');
                    hashHistory.push('/home');
                },
                error: function() {
                  // console.log(err);
                    // this.setState({openSnackbar: true, snackbarMsg: err.responseText});
                }
            });
    }

render() {
  return (
    <div id="mount">
      <img src="./../../image/Zynla.png" className="imagePosition" />
      <p className="tagline">A place to share knowledge and better understand the world</p>
  <div className="centerPosition">
<Segment compact >
  <Grid centered >
       <Form onSubmit={this.onSubmitLoginData} className="contentCenter">
            <Form.Field>
            <Form.Input name= "userName" placeholder= 'Email-ID' icon='user'
            iconPosition='left' id="formstyle" onChange={this.ChangeEmail.bind(this)}
            error={this.state.erroremail} required />
            <p style={{color: '#a54f4f'}}>{this.state.errormessageemail}</p>
            </Form.Field>

            <Form.Field><br/>
            <Form.Input type='password' name="password" placeholder='Password'
            icon='lock' iconPosition='left' id="formstyle" required/>
            </Form.Field><br/>

            <Button color='teal' circular disabled=
            {!this.state.email || !this.state.validemail}>
            <Button.Content type='submit' ><Icon name='sign in'/>Login</Button.Content>
            </Button><br/><br/>

            <p id="footer">Not yet registered?&nbsp;
            <a href="#/signup">Create Now</a>
            </p>

       </Form>
          <div className="contentCenter">
          <div>
            <a href='users/auth/facebook'>
            <Button color='blue' circular>
            <Button.Content visible><Icon name='facebook'/>Login With Facebook</Button.Content>
            </Button>
            </a>
          </div><br/><br/>
            <div>
            <a href='users/auth/google'>
            <Button color='red' circular>
            <Button.Content visible><Icon name='google'/>Login With Google</Button.Content>
            </Button>
            </a>
            </div><br/><br/>
            <div>
            <a href='users/auth/instagram'>
            <Button color='green' circular>
            <Button.Content visible><Icon name='instagram'/>Login With Instagram</Button.Content>
            </Button>
            </a>
          </div>
        </div>
       </Grid>
</Segment>
  </div>
</div>);
}
}

module.exports = Login;
