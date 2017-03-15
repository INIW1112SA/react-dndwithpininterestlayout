import React from 'react';
import {Grid, Dimmer, Button, Image} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import $ from 'jquery';

class CreateCards extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            follow: []
        };
    }

    setSelected(item)
    {
        // console.log(item);
        let temp = true;
            this.state.follow.map(function(items) {
                if (item === items) {
                    temp = false;
                }
            });
            if(temp)
            {
                this.state.follow.push(item);
                this.props.addCategories(this.state.follow, this.props.categories);
            }
            else
            {
                let i = this.state.follow.indexOf(item);
                if(i !== -1) {
                    this.state.follow.splice(i, 1);
                    // console.log(this.state.follow);
                    this.props.addCategories(this.state.follow, this.props.categories);
                }
            }
        // this.state.follow.map(function(items)
        // {
        //     console.log('ffffffff');
        //     if(items === item)
        //     {
        //         let i = this.state.follow.indexOf(item);
        //         if(i != -1) {
        //             this.state.follow.splice(i, 1);
        //             console.log(this.state.follow);
        //         }
        //     }
        //     else {
        //             this.state.follow.push(item);
        //             console.log(this.state.follow);
        //         }
        // });
        // // e.preventDefault();
        // console.log('Event',this.props.categories);
        // console.log('Event', e);
        // console.log('Refs',this.refs.card.getAttribute('id'));
        //   if(this.state.follow !== )
        //   this.state.follow.push(result.label);
        // else
        //   this.refs.card.id
        // this.state.follow.push(this.refs.card.id);
    }


    submitCatagory()
    {
        if(this.state.follow.length === 0)
        {
            /* eslint-disable*/
            alert('Please select atleast one category');
            /* eslint-enable*/
        }
        else
        {
        let jObject = {};
        jObject = JSON.stringify(this.state.follow);
        $.ajax({
            url: 'http://localhost:8080/users/addCatagory',
            type: 'post',
            data: {
                catagory: jObject,
                email: this.props.email
            },
            success: function() {
                // console.log('Successfully got JSON Catagory' + JSON.stringify(data));
                $.ajax({
                    url: 'http://localhost:8080/users/updateIsNew/' + this.props.email,
                    type: 'put',
                    data: {
                        isNew: 'N'
                    },
                    success: function() {
                        // console.log(Cookie.load('email'));
                        hashHistory.push('/userProfile');
                    },
                    error: function() {
                        // console.log('error occurred on AJAX for update');
                    }
                });
            }.bind(this),
            error: function() {
                // console.log('error occurred on AJAX');
                // console.log(err);
            }
        });
        }
    }
    render()
    {
        /* eslint-disable */
        let context = this;
        let cardButton;
        /* eslint-enable */
        let data = this.props.categories.map(function(item) {
            let tempButtom = true;
            context.props.itemss.map(function(category) {
                // console.log(item);
                if(item.name === category)
                {
                    tempButtom = false;
                }
            });
            if(tempButtom)
            {
                // console.log('in if');
                cardButton = null;
            }
            else
            {
                // console.log('in else');
cardButton = <Image src='https://8biticon.com/static/images/tick.png' style={{height: 50 + 'px'}}/>;
            }
            // console.log('card Buttton: ', cardButton)
            return (
                // eslint-disable
                <Grid.Column>
                  {/* eslint-enable */}
        <Image src = {item.image} style = {{height: 300 + 'px'}} shape = 'circular'
        onClick={() => context.setSelected(item.name)}/>
          <div style={{marginLeft: 134 + 'px', marginTop: 22 + 'px'}}>{cardButton}</div>

                </Grid.Column>
            );
        });
        return (
         <Dimmer active style={{height: 800 + 'px'}}>
                <Grid.Row>
                    <Grid.Column width = {12} style = {{width: 800 + 'px'}}>
                        <Grid columns = "3" style = {{width: 1081 + 'px', marginLeft: 115 + 'px'}}>
                            {data}
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width = {4} style = {{float: 'right', marginTop: -355 + 'px'}}>
                    <Button primary content = 'Next' icon = 'right arrow' labelPosition='right'
                    onClick={this.submitCatagory.bind(this)} style={{marginRight: 30 + 'px'}}/>
                    </Grid.Column>
                </Grid.Row>
        </Dimmer>
        );
    }
}
CreateCards.propTypes = {
    email: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array.isRequired,
    addCategories: React.PropTypes.func.isRequired
};
export default CreateCards;
