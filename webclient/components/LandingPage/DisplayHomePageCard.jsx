import React from 'react';
const Packery = require('react-packery-component')(React);
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DndCard from 'react-dnd-card';
import {createItem } from './Item';
let packeryOptions = {
  // transitionDuration: 0,
    gutter: 20
};
class DisplayHomePageCard extends React.Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.state = {allCards: this.props.display};
    }
    moveCard(dragIndex, hoverIndex) {
    const { allCards } = this.state;
    const dragItem = allCards[dragIndex];
    this.setState(update(this.state, {
      allCards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    }));}

    render() {
        /* Getting the values from Mongo db*/
        // console.log('ffff');
// console.log(this.props.display);
        return (
          <Packery
            elementType={'div'} options={packeryOptions} className = 'packery'>
            {this.state.allCards.length > 0 ? this.state.allCards.map((item, index) => (
          <DndCard
            key = {index}
            index={index}
            source={item}
            createItem={createItem}
            moveCard={this.moveCard}
            style={{ marginBottom: '.5em' }}
          />
        )) : null}

            </Packery>
        );
    }
}

DisplayHomePageCard .propTypes = {
   display: React.PropTypes.func
 };
export default DragDropContext(HTML5Backend)(DisplayHomePageCard);
