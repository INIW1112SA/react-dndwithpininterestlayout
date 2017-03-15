import React, { PropTypes } from 'react';
import {Grid} from 'semantic-ui-react';
import DisplayHomePageCardStructure from './DisplayHomePageCardStructure.jsx';

const propTypes = {
  isDragging: PropTypes.bool.isRequired,
  items: PropTypes.object.isRequired
};

export function Item(props) {
  /*eslint-disable*/
  const { items, isDragging } = props;
  /*eslint-enable*/
  return (
    <div>

      <Grid.Column>
        <DisplayHomePageCardStructure id={items.id} displayImage={items.displayImage}
        heading={items.heading} question={items.question} postedBy={items.postedBy}
        addedOn={items.addedOn} category={items.category} upVotes={items.upVotes}
        downVotes={items.downVotes} answerCounts={items.answerCounts} views={items.views}
        profileImage={items.profileImage}
      />

    </Grid.Column>

    </div>
  );
}

Item.propTypes = propTypes;

export function createItem(item, isDragging) {
  return <Item items = {item} isDragging = {isDragging}/>;
}
