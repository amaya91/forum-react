/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Form, Button, Alert, Navbar, Nav, NavDropdown, FormControl, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../reducers/user/userActions';
import { API } from '../../config';
import { Link } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            hasError: false
        }
    
    }

    goToSignUp = () => {
        this.props.history.push('/signup');
    }

    handleEmail = event => {
        this.setState({ email: event.target.value });
    }

    handlePassword = event => {
        this.setState({ password: event.target.value });
    }
    

    handleSubmit = event => {
        event.preventDefault();
        //call API

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + 'login', requestOptions)
            .then(res => {
                if(res.status !== 200){
                    throw new Error("Login Failed");
                }    
                return res.json();
            })
            .then(response => {
                console.log(response.userId);
                localStorage.setItem("user", this.state.email);
                //save response to the state
                this.props.login(response);
                this.props.history.push("/");
            })
            .catch(err => {
                this.setState({ hasError: true })
                console.log(err);
            })
    }

    render(){
        return (
            <div className="page-container">
                <Navbar bg="light" className="white" expand="xl">
                    <Navbar.Brand id="parent" style={{ marginRight: '0'}}> The R Word.</Navbar.Brand>
                </Navbar>
            <div className="container content-wrap" >
                    <Card >
                        <Card.Body>
                            {this.state.hasError ? 
                            <Alert variant="danger" onClick={() => this.setState({hasError: false})}>Login failed</Alert> : ""}
                            <Form onSubmit={this.handleSubmit}>
                                <h2>The R Word</h2>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.email}
                                        onChange={this.handleEmail}
                                    />    
                                    <br />
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.handlePassword}
                                    />
                                </Form.Group>
                                <Button type="submit" style={{ width: '100%'}} variant="dark">Login</Button>
                            </Form>
                            <br />
                            <Link className="link" to="/signup">Not a User? Sign up!</Link>
                        </Card.Body>
                    </Card>       
            </div>
            <div className="footer">
                    <div className="center">
                        <div className="row">
                            <a className="link" style={{paddingRight: "5px"}} href="https://linkedin.com/in/ruthamaya"><i className="fab fa-linkedin"></i>LinkedIn</a>
                            <a className="link " href="https://github.com/amaya91"><i class="fab fa-github"></i>GitHub</a>
                        </div>
                        <div className="row"> Ruth Amaya 2020 </div>
                    </div>
                </div>
        </div>    
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    login
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)