import Categories from './categories.jsx';
import QuestionPage from './questionpage';
import Concepts from './concepts';
import People from './People';
import React from 'react';
import $ from 'jquery';
import Cookie from 'react-cookie';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            savedata: [],
            concept: [],
            component: '',
            people: '',
            isfollow: [],
            followtopic: 'Follow'
        };
    }

    componentDidMount() {
      this.getSearchCards();
      this.getPeople();
      this.getConcept();
      this.isFollowTopic();
    }

    componentWillReceiveProps() {
      this.getSearchCards();
      this.getPeople();
      this.getConcept();
      this.isFollowTopic();
    }

    changeComponent(x) {
      if(x === 'people') {
        /* eslint-disable */
        let temp = (
          <People people = {this.state.people} isfollow = {this.state.isfollow}/>
        );
        /* eslint-enable */
        this.setState({
          component: temp
        });
      }
      else if(x === 'questions') {
        /* eslint-disable */
        let temp = (
          <QuestionPage display ={this.state.savedata} />
        );
        /* eslint-enable */
        this.setState({
          component: temp
        });
      }
    }

    /* Get the search cards*/
    getSearchCards() {
      let q = window.location.hash.split('question=')[1];
      let arr = [];
      $.ajax({
          url: '/search/getquestions',
          type: 'POST',
          data: {
            q: q
          },
          success: function(data) {
            data.map(function(item) {
              arr.push(item);
            });
            this.setState({savedata: arr});
            /* eslint-disable */
            let temp = (
              <QuestionPage display ={this.state.savedata} />
            );
            /* eslint-enable */
            this.setState({
              component: temp
            });
          }.bind(this)
        });
   }

   getPeople() {
     let q = window.location.hash.split('question=')[1];
     let arr = [];
     $.ajax({
         url: '/search/getpeople',
         type: 'POST',
         data: {
           q: q
         },
         success: function(data) {
           data.map(function(item) {
             arr.push(item);
           });
           this.setState({people: arr});
           this.isFollow();
         }.bind(this)
       });
   }

   isFollowTopic() {
     let id = Cookie.load('email');
     let q = window.location.hash.split('question=')[1];
     $.ajax({
         url: '/search/isfollowtopic',
         type: 'POST',
         data: {
           name: id,
           q: q
         },
         success: function(data) {
           if(data.follow) {
             this.setState({
               followtopic: 'Following'
             });
           }
           else {
             this.setState({
               followtopic: 'Follow'
             });
           }
         }.bind(this)
       });
   }

   isFollow() {
     if(this.state.followtopic === 'Following') {
       return 0;
     }
     let id = Cookie.load('email');
     let arr = [];
     this.state.people.map(function(item) {
       arr.push(item);
     });
     arr = JSON.stringify(arr);
     $.ajax({
         url: '/search/isfollow',
         type: 'POST',
         data: {
            name: id,
            emailArray: arr
         },
         success: function(data) {
           this.setState({isfollow: data});
         }.bind(this)
       });
       return 1;
   }

   getConcept() {
     let q = window.location.hash.split('question=')[1];
     $.ajax({
         url: '/search/getconcepts',
         type: 'POST',
         data: {
           concept: q
         },
         success: function(data) {
           this.setState({concept: data});
         }.bind(this)
       });
   }

   followTopic() {
     let q = window.location.hash.split('question=')[1];
     let id = Cookie.load('email');
     $.ajax({
         url: '/search/followtopic',
         type: 'POST',
         data: {
           id: id,
           concept: q
         },
         success: function() {
           let temp = 'following ' + q;
           this.setState({followtopic: temp});
         }.bind(this)
      });
   }

   render() {
       return (
             <div className='search1' >
                 <Concepts json = {this.state.concept} q = {this.state.followtopic}
                  followTopic = {this.followTopic.bind(this)}/>
                 <Categories changeComponent = {this.changeComponent.bind(this)}/>
                 {this.state.component}
             </div>
       );
   }
}

module.exports = Search;
