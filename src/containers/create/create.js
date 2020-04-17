/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Form, Button, Navbar, Nav,  FormGroup, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { API } from '../../config';
import { addPost, loadPosts } from '../../reducers/user/userActions'
// import { logout } from '../../reducers/user/userActions';


class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            title: "",
            body: "",
            author: "",
            subraddit: "",
        }

    
    }

    componentDidMount(){

    }

   handleCreate = event => {
        event.preventDefault();

        if(this.state.title.length == 0){
            return;
        } 

        const newPost = {
            author: this.state.author,
            title: this.state.title,
            body: this.state.body,
            subraddit: this.state.subraddit
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + "post", requestOptions)
            .then(res => {
                if(res.status !== 201) {
                    throw new Error("Not created.");
                }    
                return res.json()
            })
            .then(response => {
                //save to global state
                this.props.addPost(response);
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login');
    }

    handleAuthor = event => {
        this.setState({ author: event.target.value });
    }

    handleTitle = event => {
        this.setState({ title: event.target.value });
    }

    handleBody = event => {
        this.setState({ body: event.target.value });
    }

    handleSubraddit = event => {
        this.setState({ subraddit: event.target.value });
    }

    goToCreateForm = () => {
        this.props.history.push('/create');
    }
     
    goToHome = () => {
        this.props.history.push('/');
    }

    render(){
        if(this.state.loading){
            return (
                <div></div>
            )
        }
        return (
            <div className="page-container">
                <Navbar bg="light" className="white" expand="xl">
                    <Navbar.Brand id="parent" style={{ marginRight: '0'}} onClick={this.goToHome}> The R Word.</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={this.goToHome}>Posts</Nav.Link>
                            <Nav.Link onClick={this.logout}>Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
               <div className="container content-wrap"> 
                        <Card>
                            <Card.Body>
                                <Form onSubmit={this.handleCreate}>
                                    <h2>New Post</h2>
                                    <FormGroup>
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                            type="text"
                                            value={this.state.title}
                                            onChange={this.handleTitle}
                                        />  
                                        <Form.Label>Body:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.state.body}
                                            onChange={this.handleBody}
                                        />  
                                        <Form.Label>Author:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.state.author}
                                            onChange={this.handleAuthor}
                                        />  
                                        <Form.Label>Topic:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.state.subraddit}
                                            onChange={this.handleSubraddit}
                                        />  
                                        </FormGroup>
                                        <Button style={{ width: '100%'}} variant="dark" type="submit">Create New Post</Button>

                                </Form>
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
    user: state.user,
    // completeList: 
    // completedList: state.user.todoList.filter(t => t.completed)
})

const mapDispatchToProps = {
    addPost, 
    loadPosts
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)