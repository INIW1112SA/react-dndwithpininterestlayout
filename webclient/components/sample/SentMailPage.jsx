import React from 'react';
import {
    Grid,
    Button
} from 'semantic-ui-react';
// import './applicationHome.css';
import SentMail from '../../config/SentMail.json';
export default class SentMailPage extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="mount">
                <img src="./../../image/Zynla.png" className="imagePosition" />
                <Grid container>
                    <Grid.Row>
                        <Grid.Column width={2}/>
                        <Grid.Column width={9}/>
                        <Grid.Column width={5}>
                            <h2 style={{
                                    marginTop: -80 + 'px'
                                }}>
                                <Button circular style={{
                                    backgroundColor: 'grey'
                                }}>
                                    <a href="#/" style={{
                                        color: 'white'
                                    }}>LOGIN</a>
                                </Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button circular style={{
                                    backgroundColor: 'grey',
                                    marginLeft: 30 + 'px'
                                }}>
                                    <a href="#/signup" style={{
                                        color: 'white'
                                    }}>SIGNUP</a>
                                </Button>
                            </h2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row>
                        <Grid.Column style={{
                            textAlign: 'center'
                        }}>
                            <p id='head1'>
                              {SentMail.head1}<br/>
                                <h3 >{SentMail.head2}</h3>
                                <h1 >{SentMail.head3}</h1>

                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                </Grid>
            </div>
        );
    }
}
