import React from 'react';
import CreateCards from './CreateCards';
import Cookie from 'react-cookie';
import $ from 'jquery';

export default class SuccessfullyRegistered extends React.Component {
  constructor() {
    super();
    this.state = {
      follows: [],
      catagories: []

    };
  }
  // componentWillMount() {
  //   this.getCatagory();
  //  }
   componentDidMount() {
    $.ajax({
      url: 'http://localhost:8080/users/displayCatagory',
      type: 'GET',
      success: function(data) {
        // console.log('Successfully got JSON Catagory' + JSON.stringify(data));
        // console.log(data);
        this.setState({catagories: data});
      }.bind(this),
      error: function() {
        // console.log('error occurred on AJAX');
        // console.log(err);
      }
    });
   }

   addCategories(items, category)
   {
    // console.log('getting items from createcards',items);
      this.setState({follows: items});
      this.setState({catagories: category});
      // console.log('display states',this.state.follows);
   }


  render() {
    return(
        <CreateCards categories={this.state.catagories} email={Cookie.load('email')}
        itemss={this.state.follows} addCategories={this.addCategories.bind(this)}/>
      );
}
}
