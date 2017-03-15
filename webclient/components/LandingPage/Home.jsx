import DisplayFavouriteCategory from './DisplayFavouriteCategory.jsx';
import DisplayHomePageCard from './DisplayHomePageCard';
import React from 'react';
import Cookie from 'react-cookie';
import $ from 'jquery';

class Cards extends React.Component {
   constructor() {
       super();
       this.state = {
           json: [],
             savedata: []
       };
     this.displayAllCategory = this.displayAllCategory.bind(this);
   }

   componentDidMount() {
     this.displayFollowingCards();
     this.displayAllCategory();
   }
   /* Get the saved cards Id from neo4j*/
   displayFollowingCards() {
     let emailId = Cookie.load('email');
     let arr = [];
     $.ajax({
         url: `/users/viewFollowCard/${emailId}`,
         type: 'GET',
         success: function(data) {
           data.map(function(item) {
             item.watchingList.map(function(items) {
               arr.push(items);
             });
           });

           this.setState({savedata: arr});
           this.displayRandomCards();
         }.bind(this)
       });
  }
  /* Display all the cards in Landing page from mongodb*/
  displayRandomCards() {
    let arr2 = this.state.savedata;
    $.ajax({
        url: '/list/',
        type: 'GET',
        success: function(data) {
          data.map(function(item) {
            arr2.push(item);
          });
          // console.log('aswini');
          // console.log(data);
          this.setState({savedata: arr2});
        }.bind(this)
      });
  }
   // Display your all the category
  displayAllCategory() {
    // console.log("Inside...")
    $.ajax({
      url: '/list/getImages',
      type: 'GET',
      success: function(data) {
        this.setState({json: data});
      }.bind(this)
    });
  }
  render() {
      return (
            <div className='search1' >
                <DisplayFavouriteCategory json={this.state.json} />
                {this.state.savedata.length
                  > 0 ? <DisplayHomePageCard display = {this.state.savedata} /> : null}
            </div>
      );
  }
}

module.exports = Cards;
