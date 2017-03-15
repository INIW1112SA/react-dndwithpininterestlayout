import React from 'react';
import {
    Icon,
    Button,
    Form,
    Input,
    Dimmer,
    Loader,
    Menu,
    Grid,
    Segment
} from 'semantic-ui-react';
import Cookie from 'react-cookie';
import Chat from './chatbot.jsx';
import InterestsCard from './interestedCategories/interestsCard';
class basicInfo extends React.Component {

    handleOpen = () => this.setState({active: true})
    handleClose = () => this.setState({active: false})
    constructor() {
        super();
        this.state = {
            loader: false,
            activeItem: 'Education',
            transparent: true,
            editEduIcon: '',
            editLocIcon: '',
            editAbtIcon: '',
            primary: '',
            secondary: '',
            university: '',
            line1: '',
            line2: '',
            region: '',
            country: '',
            postalCode: '',
            city: '',
            picture: '',
            description: '',
            dob: '',
            gender: '',
            phone: '',
            interestsData: [],
            but: 'Add',
            but1: 'Add',
            but2: 'Add',
            EduTitle: 'Add Education',
            LocTitle: 'Add Location',
            AbtTitle: 'Add about yourself',
            profileForm: '',
            status: 0
        };

        this.handleItemClick = this.handleItemClick.bind(this);
        this.updateEducation = this.updateEducation.bind(this);
    }

    handleItemClick(e, {name}) {
        let data;
        if (name === 'Education') {
            data = (
                <div>
                      <h2 style={{fontFamily: 'Georgia, serif'}}>
                          I did my schooling from <a style={{cursor: 'pointer'}}
                            onClick = {this.updateEducation}>
                            {this.state.primary}</a> earned my degree from <a>
                              {this.state.university}</a>.<br/>
                          and completed the high schooling from <a>{this.state.secondary}</a>.
                      </h2>
                            {
                            /* <label>Primary</label>
                            <Input inverted transparent={this.state.transparent} size='small'
                            value = {this.state.primary} placeholder={this.state.primary}
                            onChange={this.changePrimary.bind(this)}/>

                            <label>Secondary</label>
                            <Input inverted transparent={this.state.transparent}
                            placeholder={this.state.secondary}
                            onChange={this.changeSecondary.bind(this)}/>
                            <label>University</label>
                            <Input inverted transparent={this.state.transparent}
                            placeholder={this.state.university}
                            onChange={this.changeUniversity.bind(this)}/> */
                          }

                </div>
            );
        } else if (name === 'Location') {
            data = (
                <div>
                    <Form action='?#/profile'>
                        <Form.Field>
                            <label>Line1</label>
                            <Input onChange={this.changeLine1.bind(this)}
                              placeholder={this.state.line1}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Line2</label>
                            <Input onChange={this.changeLine2.bind(this)}
                              placeholder={this.state.line2}/>
                        </Form.Field>
                        <Form.Field>
                            <label>City</label>
                            <Input onChange={this.changeCity.bind(this)}
                              placeholder={this.state.city}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Region</label>
                            <Input onChange={this.changeRegion.bind(this)}
                               placeholder={this.state.region}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Postal Code</label>
                            <Input onChange={this.changePostalCode.bind(this)}
                               placeholder={this.state.postalCode}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Country</label>
                            <Input onChange={this.changeCountry.bind(this)}
                               placeholder={this.state.country}/>
                        </Form.Field>
                    </Form>
                    <Button onClick={this.updateLocation.bind(this)}>
                      <Icon name={this.state.editLocIcon}/> {this.state.but1}</Button>
                </div>
            );
        } else if (name === 'Personal') {
            data = (
                <div>
                    <Form action='?#/profile'>
                        <Form.Field>
                            <label>Picture</label>
                            <Input placeholder={this.state.picture}
                              onChange={this.changePhoto.bind(this)}/>
                        </Form.Field>
                        <Form.TextArea label='Description' placeholder={this.state.description}
                          onChange={this.changeDescription.bind(this)}/>
                        <Form.Field>
                            <label>Date Of Birth</label>
                            <Input placeholder={this.state.dob}
                              onChange={this.changeDob.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Gender</label>
                            <Input placeholder={this.state.gender}
                              onChange={this.changeGender.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Phone</label>
                            <Input placeholder={this.state.phone}
                              onChange={this.changePhone.bind(this)}/>
                        </Form.Field>
                    </Form>
                    <Button onClick={this.updateAbout.bind(this)}>
                        <Icon name={this.state.editAbtIcon}/>{this.state.but2}</Button>
                </div>
            );
        } else if (name === 'Interested Topics') {
            data = (<InterestsCard interestData={this.state.interestsData}/>);
        }
        this.setState({activeItem: name, profileForm: data});
    }
    changePrimary(e) {
        this.setState({primary: e.target.value});
    }
    changeSecondary(e) {
        this.setState({secondary: e.target.value});
    }
    changeUniversity(e) {
        this.setState({university: e.target.value});
    }
    changeLine1(e) {
        this.setState({line1: e.target.value});
    }
    changeLine2(e) {
        this.setState({line2: e.target.value});
    }
    changeCountry(e) {
        this.setState({country: e.target.value});
    }
    changeRegion(e) {
        this.setState({region: e.target.value});
    }
    changeCity(e) {
        this.setState({city: e.target.value});
    }
    changePostalCode(e) {
        this.setState({postalCode: e.target.value});
    }
    changePhoto(e) {
        this.setState({picture: e.target.value});
    }
    changeDescription(e) {
        this.setState({description: e.target.value});
    }
    changeDob(e) {
        this.setState({dob: e.target.value});
    }
    changeGender(e) {
        this.setState({gender: e.target.value});
    }
    changePhone(e) {
        this.setState({phone: e.target.value});
    }
    handleChange = (e, {value}) => this.setState({value})
    componentWillMount() {
        // console.log("comes");
        this.handleOpen();
        this.getProfile();
        this.getInterestedTopics();
        let tmp = (<div>
              <h1>
                  I completed my class X at
                  <a onClick = {this.updateEducation}>{this.state.primary}</a>
                   earned my degree from <a>{this.state.university}</a>.<br/>
                  and completed the class XII  from <a>{this.state.secondary}</a>.
              </h1>
                    {
                      /* <label>Primary</label>
                    <Input inverted transparent={this.state.transparent} size='small'
                    value = {this.state.primary} placeholder={this.state.primary}
                    onChange={this.changePrimary.bind(this)}/>

                    <label>Secondary</label>
                    <Input inverted transparent={this.state.transparent}
                    placeholder={this.state.secondary} onChange={this.changeSecondary.bind(this)}/>
                    <label>University</label>
                    <Input inverted transparent={this.state.transparent}
                    placeholder={this.state.university}
                    onChange={this.changeUniversity.bind(this)}/> */
                  }

        </div>);
        this.setState({
          profileForm: tmp
        });
    }
    getProfile() {
        $.ajax({
            url: 'http://localhost:8080/userdoc/getuserprofile',
            type: 'post',
            data: {
                email: Cookie.load('email')
            },
            success: function(data) {
                this.handleClose();
                if (data.profile.education.primary || data.profile.education.highschool ||
                  data.profile.education.university) {
                    this.setState({
                        but: 'Edit',
                        EduTitle: 'Edit Education',
                        primary: data.profile.education.primary,
                        secondary: data.profile.education.highSchool,
                        university: data.profile.education.university,
                        editEduIcon: 'write square'
                    });
                } else {
                    this.setState({but: 'Add', EduTitle: 'Add Education',
                    primary: data.profile.education.primary,
                    secondary: data.profile.education.highSchool,
                    university: data.profile.education.university});
                }

                if (data.profile.address.Line1 || data.profile.address.Line2 ||
                  data.profile.address.country || data.profile.address.region ||
                  data.profile.address.city || data.profile.address.postalCode) {
                    this.setState({
                        but1: 'Edit',
                        LocTitle: 'Edit Location',
                        line1: data.profile.address.Line1,
                        line2: data.profile.address.Line2,
                        country: data.profile.address.country,
                        region: data.profile.address.region,
                        city: data.profile.address.city,
                        postalCode: data.profile.address.postalCode,
                        editLocIcon: 'write square'
                    });
                } else {
                    this.setState({
                        but1: 'Submit',
                        LocTitle: 'Add Location',
                        line1: data.profile.address.Line1,
                        line2: data.profile.address.Line2,
                        country: data.profile.address.country,
                        region: data.profile.address.region,
                        city: data.profile.address.city,
                        postalCode: data.profile.address.postalCode
                    });
                }
                if (data.profile.picture || data.profile.description ||
                  data.profile.dob || data.profile.gender || data.profile.phone) {
                    this.setState({
                        but2: 'Edit',
                        AbtTitle: 'Edit About Yourself',
                        picture: data.profile.picture,
                        description: data.profile.description,
                        dob: data.profile.dob,
                        gender: data.profile.gender,
                        phone: data.profile.phone,
                        editAbtIcon: 'write square'
                    });
                } else {
                    this.setState({
                        but2: 'Submit',
                        AbtTitle: 'Add Profile',
                        picture: data.profile.picture,
                        description: data.profile.description,
                        dob: data.profile.dob,
                        gender: data.profile.gender,
                        phone: data.profile.phone
                    });
                }
            }.bind(this),
            error: function() {

            }
        });
    }
    updateEducation() {
      if (this.state.but === 'Edit' || this.state.but === 'Add') {
          this.setState({
            but: 'Submit',
            transparent: false,
            loader: true
          });
      }
      else if (this.state.but === 'Submit') {
        let eduData = {
            primary: this.state.primary,
            highSchool: this.state.highSchool,
            university: this.state.university,
            email: Cookie.load('email')
        };
        //   // console.log(JSON.stringify(edu);
        $.ajax({
            url: 'http://localhost:8080/userdoc/updateEdu',
            type: 'POST',
            data: eduData,
            success: function() {
                this.setState({loader: false, but: 'Edit', EduTitle: 'Edit Education',
                editIcon: 'write square', transparent: true});
                /*eslint-disable*/
                alert("Education Details Updated Successfully");
                /*eslint-enable*/
                // console.log(data);
            }.bind(this),
            error: function() {
                // console.error(err.toString());
            }
        });
      }
    }
    updateLocation() {
        let locData = {
            Line1: this.state.line1,
            Line2: this.state.line2,
            country: this.state.country,
            region: this.state.region,
            city: this.state.city,
            postalCode: this.state.postalCode,
            email: Cookie.load('email')
        };
        //   // console.log(JSON.stringify(locData);
        $.ajax({
            url: 'http://localhost:8080/userdoc/updateLoc',
            type: 'POST',
            data: locData,
            success: function() {
                this.setState({but1: 'Edit', LocTitle: 'Edit Location'});
                /*eslint-disable*/
                alert("Location Details Updated Successfully");
                /*eslint-enable*/
                // console.log(data);
            }.bind(this),
            error: function() {
                // console.error(err.toString());
            }
        });
    }

    updateAbout() {
        let proData = {

            picture: this.state.picture,
            description: this.state.description,
            dob: this.state.dob,
            gender: this.state.gender,
            phone: this.state.phone,
            email: Cookie.load('email')
        };
        //   // console.log(JSON.stringify(proData);
        $.ajax({
            url: 'http://localhost:8080/userdoc/updatePro',
            type: 'POST',
            data: proData,
            success: function() {
                this.setState({but2: 'Edit', AbtTitle: 'Edit Profile'});
                /*eslint-disable*/
                alert("Personal Details Updated Successfully");
                /*eslint-enable*/
                // console.log(data);
            }.bind(this),
            error: function() {
                // console.error(err.toString());
            }
        });
    }
    getInterestedTopics() {
        $.ajax({
            url: 'http://localhost:8080/userdoc/getInterestedTopics',
            type: 'POST',
            data: {
                email: Cookie.load('email')
            },
            success: function(data) {
                this.setState({interestsData: data});
            }.bind(this),
            error: function() {
                // console.error(err.toString());
            }
        });
    }

    render() {
        const {active} = this.state;
        const {activeItem} = this.state;

        return (

                      <div>

                <Dimmer active={active} page>
                    <Loader>Loading</Loader>
                </Dimmer>

                <Grid>
                    <Grid.Column width={4}>
                        <Menu style={{fontFamily: 'Georgia, serif'}} fluid vertical tabular>

                            <Menu.Item name='Education' active={activeItem === 'Education'}
                              onClick={this.handleItemClick}/>
                            <Menu.Item name='Location' active={activeItem === 'Location'}
                              onClick={this.handleItemClick}/>
                            <Menu.Item name='Personal' active={activeItem === 'Personal'}
                              onClick={this.handleItemClick}/>
                            <Menu.Item name='Interested Topics'
                              active={activeItem === 'Interested Topics'}
                              onClick={this.handleItemClick}/>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
                        <Segment>
                            <Chat/>
                            {this.state.profileForm}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
module.exports = basicInfo;
