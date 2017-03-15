// written by Arun Mohan Raj
// importing the required files
import React from 'react';
import SuggestCard from './suggQueCard.jsx';

class SuggQueCards extends React.Component {
	constructor () {
		super();
		this.state = {
			suggQueIds: []
		};
		this.suggQuestionUpdate = this.suggQuestionUpdate.bind(this);
	}
	suggQuestionUpdate(id) {
		/* eslint-disable */
		if(!(this.state.suggQueIds).includes(id)) {
		/* eslint-enable */
				let queIds = this.state.suggQueIds;
				queIds.push(id);
				this.setState({suggQueIds: queIds});
				this.props.suggArr(this.state.suggQueIds);
				// console.log('id array',this.state.suggQueIds);
		}else
		{
				let i = this.state.suggQueIds.indexOf(id);
				if(i !== -1) {
						this.state.suggQueIds.splice(i, 1);
				}
					// console.log('id array after splice',this.state.suggQueIds);
			}
}
	render () {
		// map function to get the array value and
		// passing it to card to get the array of cards
    let suggQueCollection = this.props.quedata;
		/* eslint-disable */
		let context = this;
		// map function to get the array value and
		// passing it to card to get the array of cards
		// console.log('qid',this.props.qid);
		let cards = suggQueCollection.map(function(item) {
			// console.log('id', item._fields[0].start.identity.low);
			if(item._fields[0].start.identity.low==970){

		}else {
			// sending data to child card
			return (<SuggestCard id={item._fields[0].start.identity.low}
				title={item._fields[0].start.properties.name}
				content={item._fields[0].start.properties.statement}
				name={item._fields[0].end.properties.name}
			ansContent={context.props.ansContent}
			suggQues={context.suggQuestionUpdate.bind(this)}
			qIdArr={context.state.suggQueIds}
		/>);
	}
});
/*eslint-enable*/
		return (
			// returning cards to questions page
			<div>
			{cards}
		</div>
		);
	}
}
SuggQueCards.propTypes = {
	quesCollection: React.PropTypes.Array,
	quedata: React.PropTypes.Array,
	suggArr: React.PropTypes.Array
};
module.exports = SuggQueCards;
