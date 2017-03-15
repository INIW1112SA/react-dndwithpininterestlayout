import React from 'react';
import {Button} from 'semantic-ui-react';

class DisplayFavouriteCategoryStructure extends React.Component {
   constructor() {
       super();
   }

   render() {
     return(
       <div className='buttonPosition'>
         <Button color='red' className='buttonSize'>{this.props.displayImage}</Button>
       </div>
     );
   }
}

DisplayFavouriteCategoryStructure .propTypes = {
  displayImage: React.PropTypes.string.isRequired
};

module.exports = DisplayFavouriteCategoryStructure;
