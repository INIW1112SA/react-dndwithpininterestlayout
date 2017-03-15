import React from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router';

class ConceptStructure extends React.Component {
    constructor() {
        super();
    }

    render() {
      return(
        /* eslint-disable */
        <div>
          <Link to = {'/search?question=' + this.props.conceptName}>
            <Button secondary>{this.props.conceptName}</Button>
          </Link>
        </div>
        /* eslint-enable */
      );
    }
}

ConceptStructure.propTypes = {
   displayImage: React.PropTypes.string.isRequired
 };

module.exports = ConceptStructure;
