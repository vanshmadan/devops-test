import React from 'react';
import { Button, Input, Container, Row, Col } from 'reactstrap';
import NayaLogo from '../images/naya_logo.png';
import { Redirect } from 'react-router-dom';
import ButtonColorPicker from '../ColorPicker/colorPicker';
import {signInAPICall} from '../api';

class Login extends React.Component {
    
    state = {
        username: "",
        password: "",
        color: "",
        redirect: false
    }

    constructor(){
        super();
        this.handleColor = this.handleColor.bind(this);
    }
    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onChangeColor = (e) => {
        this.setState({ color: e.target.value });
    }

    handleSignin = () => {
        //console.log(this.state.username);
        //console.log(this.state.password);
        //console.log(this.state.color);
        const {username, password, color} = this.state;
        const data = {
            username, password, color
        }
        //console.log("signin data: ", data)
        signInAPICall(data)
        .then(res => {
            if(res.error === "Failure"){
                this.setState({ redirect: false });
            }else{
                sessionStorage.setItem("token" , JSON.stringify({username : res.username, color : res.color, _id : res._id}))
                this.setState({ redirect: true });
            }
        })
        
    }

    handleColor = (colorhex) => {
        this.setState({color : colorhex});
        //console.log("color changed : ", this.state.color);
    }

    
    render() {
        if (this.state.redirect) {
            return <Redirect to='/explore' />
        }
        return (

            <div className="login-container">

                <Container style={{ marginLeft: '10px' }}>
                    <Row><img src={NayaLogo} style={{ height: 40+'px', width: 60+'px', marginLeft: 15+'px', marginTop: 35+'px' }} className="img" align="middle" alt="logo" /></Row>
                    <Row style={{ marginTop: '40px' }}>
                        <Col xs="12" md={{ size: 1 }} style={{ fontSize: 45+'px' }}>Naya</Col>
                        <Col xs="12" md={{ size: 6, offset: 3 }} style={{ fontSize: 45+'px' }}>Login</Col>
                    </Row>
                    <Row style={{ marginTop: 40+'px' }}>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Input style = {{height : 50+'px', margin : 15+'px', borderRadius : 25+'px', fontSize : 25+'px', paddingLeft : 30+'px', boxShadow: '2px 2px 5px grey'}}
                                placeholder="Username"
                                onChange={this.onChangeUsername}></Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Input style = {{height : 50+'px', margin : 15+'px', borderRadius : 25+'px', fontSize : 25+'px', paddingLeft : 30+'px', boxShadow: '2px 2px 5px grey'}}
                                type="Password"
                                placeholder="Password"
                                onChange={this.onChangePassword}></Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }} >
                            <ButtonColorPicker  style = {{margin : '15px'}} handleColorfromParent = {this.handleColor}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm={{ size: 6, offset: 3 }}>
                            <Button
                                className="login-button"
                                style={{
                                    backgroundColor: '#403368',
                                    color: 'fff',
                                    margin : 15+'px',
                                    marginTop: "5%",
                                    height : '50px',
                                    fontSize : '25px',
                                    width : '100%',
                                    borderRadius : '25px'
                                }}
                                onClick={this.handleSignin}
                            >Login</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Login;