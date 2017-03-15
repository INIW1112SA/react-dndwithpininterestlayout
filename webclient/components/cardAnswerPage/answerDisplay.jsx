import React from 'react';
import Answercard from './answerCardStructure.jsx';

class Cards extends React.Component {
	constructor () {
		super();
	}
	// static defaultProps = {}


	render () {
		let arr = this.props.ansCollection;
		let cards = arr[0].topCards.map(function(item) {
				return (
			<div>
				<Answercard createdBy={item.createdBy} content={item.content}
				createdOn={item.createdOn} id={item.id} upvote={item.upVote}
				downvote={item.downVote} isAccepted={item.isAccepted}/>
			</div>
			);
		});

		return(
			<div>
			{cards}
		</div>
		);
	}
}
Cards.propTypes = {
	ansCollection: React.PropTypes.Array
};
module.exports = Cards;
