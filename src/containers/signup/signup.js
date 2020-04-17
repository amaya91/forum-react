/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Form, Button, Alert, Navbar, Nav, NavDropdown, FormControl, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { login } from '../../user/userActions';
import { API } from '../../config';
import { Link } from 'react-router-dom';


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            repassword: "",
            hasError: false,
            hasServerError: false,
        }
    
    }

    handleFirstName = event => {
        this.setState({ firstName: event.target.value });
    }

    handleLastName = event => {
        this.setState({ lastName: event.target.value });
    }

    handleEmail = event => {
        this.setState({ email: event.target.value });
    }

    handlePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleRepassword = event => {
        this.setState({ repassword: event.target.value });
    }
    goToHome = () => {
        this.props.history.push('/');
    }

    handleSubmit = event => {
        event.preventDefault();
        //call API

        if (this.state.password !== this.state.repassword) {
            this.setState({hasError: true})
            return;
        } 

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + 'signup', requestOptions)
            .then(res => {
                if(res.status !== 201){
                    throw new Error("Register Failed");
                }    
                return res.json();
            })
            .then(response => {
                //save response to the state
                this.props.history.push('login');
            })
            .catch(err => {
                this.setState({ hasServerError: true })
                console.log(err);
            })

            
    }

    render(){
        return (
            <div className="page-container">
                <Navbar bg="light" className="white" expand="xl">
                    <Navbar.Brand id="parent" style={{ marginRight: '0'}}> The R Word.</Navbar.Brand>
                </Navbar>
                <div className="container content-wrap">
                        <Card >
                            <Card.Body>
                                {this.state.hasError ? 
                                <Alert variant="danger" onClick={() => this.setState({hasError: false})}>Passwords do not match.</Alert> : ""}
                                {this.state.hasServerError ? 
                                <Alert variant="danger" onClick={() => this.setState({hasServerError: false})}>Sign up failed.</Alert> : ""}
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
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.state.firstName}
                                            onChange={this.handleFirstName}
                                        />    
                                        <br />
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.state.lastName}
                                            onChange={this.handleLastName}
                                        />    
                                        <br />
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.handlePassword}
                                        />
                                        <Form.Label>Re-enter Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={this.state.repassword}
                                            onChange={this.handleRepassword}
                                        />
                                    </Form.Group>    
                                    <Button type="submit" style={{ width: '100%'}} variant="dark">Sign Up</Button>
                                </Form>
                                <br />
                                <Link className="link" to="/">Already a user? Log in!</Link>
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

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)