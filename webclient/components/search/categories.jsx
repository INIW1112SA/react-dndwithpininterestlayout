import React from 'react';
import {Grid, Icon, Button} from 'semantic-ui-react';

class Category extends React.Component {
  constructor() {
    super();
  }

  people() {
    /* eslint-disable */
    this.props.changeComponent('people');
    /* eslint-enable */
  }

  questions() {
    /* eslint-disable */
    this.props.changeComponent('questions');
    /* eslint-enable */
  }

  render() {
    return (
      <div>
        <Grid centered>
            <Grid.Column width={2} className='arrowsize'>
                <Icon name='chevron left'/>
            </Grid.Column>
            <Grid.Column width={6} centered>
                <Grid centered columns={4}>
                    <Grid.Column>
                      <Button primary onClick = {this.questions.bind(this)}>Questions</Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button primary onClick = {this.people.bind(this)}>People</Button>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
            <Grid.Column width={2} className='arrowsize'>
                <Icon name='chevron right'/>
            </Grid.Column>
        </Grid>
      </div>
    );
  }
}

module.exports = Category;
