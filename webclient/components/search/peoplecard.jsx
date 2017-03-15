import React from 'react';
import {Grid, Button, Icon} from 'semantic-ui-react';
import $ from 'jquery';
import Cookie from 'react-cookie';

class PeopleCard extends React.Component {
  constructor() {
    super();
    this.state = {
      follow: 'Follow'
    };
  }

  componentDidMount() {
    /* eslint-disable */
    if(this.props.follow) {
      this.setState({
        follow: 'Following'
      });
    }
    else {
      this.setState({
        follow: 'Follow'
      });
    }
    /* eslint-enable */
  }

  handleFollow() {
    let emailId = Cookie.load('email');
    if(this.state.follow === 'Following') {
      return 0;
    }
    $.ajax({
        url: '/search/followuser',
        type: 'POST',
        data: {
          id: emailId,
          /*eslint-disable */
          emailId: this.props.id
          /* eslint-enable */
        },
        success: function() {
          this.setState({follow: 'Following'});
        }.bind(this)
      });
      return 1;
  }

  render() {
      return (
        /* eslint-disable */
        <Grid ceneterd>
          <Grid.Column width={3} className='arrowsize'>

          </Grid.Column>
          <Grid.Column width={3} className='arrowsize'>
            <Icon name = "user" size = "large"/>
            {this.props.id}
          </Grid.Column>
          <Grid.Column width={4} centered>

          </Grid.Column>
          <Grid.Column width={3} className='arrowsize'>
              <Button primary onClick = {this.handleFollow.bind(this)}>{this.state.follow}</Button>
          </Grid.Column>
        </Grid>
        /* eslint-enable */
      );
  }
}

module.exports = PeopleCard;
