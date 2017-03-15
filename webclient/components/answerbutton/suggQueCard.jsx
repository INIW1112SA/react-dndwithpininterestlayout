// written by Arun Mohan Raj
// importing require files
import React from 'react';
import { Card, Icon} from 'semantic-ui-react';
// const logger = require('./../../applogger');
// suggested question card component
class SuggQueCard extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonStatus: 'Add',
      checkmark: '',
      status: true
    };
  }
  cardCheckmark() {
    if(this.state.status) {
        let checkmark = <Icon name='checkmark' color='green' size='large'/>;
        this.setState({checkmark: checkmark, status: false});
        this.props.suggQues(this.props.id);
        // console.log(this.props.qIdArr);
    } else {
      this.setState({checkmark: '', status: true});
      this.props.suggQues(this.props.id);
    }
  }
  render() {
      return(
        <div>
        <Card fluid onClick={this.cardCheckmark.bind(this)}>
            <Card.Content extra>
                <a>
                    posted by {this.props.name}
                </a>
                <p>
                    questioned on {this.props.time}
                      <div className='checkmarkbtn'>
                        {this.state.checkmark}
                      </div>
                </p>
            </Card.Content>
            <Card.Content>
                <Card.Header>
                    {this.props.title}
                </Card.Header>
                <Card.Description className='ansWidth'>
                    {this.props.content}
                </Card.Description>
            </Card.Content>
        </Card>
        <br />
      </div>
    );
  }
}
SuggQueCard.propTypes = {
  id: React.PropTypes.number.isRequired,
  dp: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  time: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  suggQues: React.PropTypes.func.isRequired
  };
module.exports = SuggQueCard;
